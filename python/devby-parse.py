from neo4j import GraphDatabase
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium import webdriver
from selenium.webdriver.edge.options import Options
from neo4j import GraphDatabase
from neo4j.exceptions import ServiceUnavailable

# # # # # # # # # # # # # # # # # # # # # # # DATABASE # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 

class Neo4j:

    def __init__(self, uri, user, password):
        self.driver = GraphDatabase.driver(uri, auth=(user, password))

    def close(self):
        self.driver.close()

    def add_vacancy(self, query_nodes):
         with self.driver.session() as session:
            # Write transactions allow the driver to handle retries and transient errors
            result = session.write_transaction(self._add_vacancy, query_nodes)
            return "Success"

    def _add_vacancy(self, tx, query):
        try:
            return tx.run(query)
        except ServiceUnavailable as exception:
            print("{query} raised an error: \n {exception}".format(
                query=query, exception=exception))
            raise

uri = "neo4j+s://ec77a2e7.databases.neo4j.io"
user = "neo4j"
password = "6Kp8TlP7-g-KH1qbLGkIWYObwThXeYW7fYueK8ipiPA"
DB = Neo4j(uri, user, password)


# # # # # # # # # # # # # # # # # # # # # # # SELENIUM # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 

def setSalary(vacancy):
    
    start =-1;
    end = -1;

    if 'Зарплата' in vacancy:
        zp = vacancy['Зарплата']
        
        if '—' in zp:
            ind = zp.find('—')
            start = zp[1 : ind]
            end = zp[ind+1 : len(zp)]

        elif 'от' in zp:
            ind = zp.find('$')
            start = zp[ind+1 : len(zp)]

        elif 'до' in zp:
            ind = zp.find('$')
            end = zp[ind+1 : len(zp)]
        
    vacancy['Зарплата от'] = start
    vacancy['Зарплата до'] = end



DRIVER_PATH = './msedgedriver.exe'
path = 'https://jobs.devby.io/'

options = Options()
options.headless = True
options.add_argument("--window-size=1920,1200")
driver = webdriver.Edge(options=options, executable_path=DRIVER_PATH)
driver.get(path)

button = WebDriverWait(driver, 100).until(EC.element_to_be_clickable((By.CLASS_NAME, "wishes-popup__button-close")))
button.click();
WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.CLASS_NAME, "vacancies-list__body")))

vacancies = driver.find_elements_by_class_name('vacancies-list-item__link_block')

nextVacancy = "Вакансия " + vacancies[0].text;

for index in range(len(vacancies)):
    
    vacancies[index].click();

    WebDriverWait(driver, 20).until(
        EC.visibility_of_element_located((By.CLASS_NAME, "title"))
    )

    if (index > 0): {
        WebDriverWait(driver, 20).until(
            EC.text_to_be_present_in_element((By.CLASS_NAME, "title"), nextVacancy)
        )
    }

    vacancy = {}
    vacancyName = driver.find_element_by_class_name('title').text
    vacancy['Название'] =  vacancyName[vacancyName.find(" ") + 1:]
    vacancy['Ссылка'] = vacancies[index].get_attribute("href")
    vacancy['Cкилы'] = driver.find_element_by_class_name('vacancy__tags').text.split('\n')
    vacancy['Описание'] = driver.find_element_by_class_name('vacancy__text').get_attribute('innerHTML')
    vacancy['Компания'] = driver.find_element_by_class_name('vacancy__header__company-name').text;

    info = driver.find_element_by_class_name('vacancy__info').text.split('\n')
    
    for i in range(len(info)):
        keyAndValue = info[i].split(': ')
        key = keyAndValue[0]
        value = keyAndValue[1]
        vacancy[key] = value

    setSalary(vacancy)

    if 'Режим работы' not in vacancy:
        vacancy['Режим работы'] = 'Не указан'

    if 'Размер компании' not in vacancy:
        vacancy['Размер компании'] = -1

    if 'Возможна удалённая работа' not in vacancy:
        vacancy['Возможна удалённая работа'] = 'Не указано'

    if vacancy["Cкилы"][0] == '':
        vacancy["Cкилы"] = ['Не требуются']

    for i in vacancy:
        if isinstance(vacancy[i], str):
            vacancy[i] = vacancy[i].replace('"', "'")

    query = f'''
        CREATE (vacancy{index} :vacancy{{vacancy: "{vacancy['Название']}", link: "{vacancy['Ссылка']}", salary_from: {vacancy['Зарплата от']}, salary_to: {vacancy['Зарплата до']}, description: "{vacancy['Описание']}"}})
        MERGE (specialization{index} :specialization{{specialization:"{vacancy['Специализация']}"}}) 
        MERGE (city{index} :city{{city:"{vacancy['Город']}"}}) 
        MERGE (level{index} :level{{level:"{vacancy['Уровень']}"}}) 
        MERGE (english_level{index} :english_level{{english_level:"{vacancy['Уровень английского']}"}})
        MERGE (experience{index} :experience{{experience:"{vacancy['Опыт']}"}})
        MERGE (work_time{index} :work_time{{work_time:"{vacancy['Режим работы']}"}})
        MERGE (distance_work{index} :distance_work{{distance_work:"{vacancy['Возможна удалённая работа']}"}})
        MERGE (company{index} :company{{company:"{vacancy['Компания']}", company_size: {vacancy['Размер компании']}}})

        CREATE (vacancy{index})-[: has_specialization]->(specialization{index})
        CREATE (vacancy{index})-[: located_in]->(city{index})
        CREATE (vacancy{index})-[: has_level]->(level{index})
        CREATE (vacancy{index})-[: has_english_level]->(english_level{index})
        CREATE (vacancy{index})-[: has_experience]->(experience{index})
        CREATE (vacancy{index})-[: has_work_time]->(work_time{index})
        CREATE (vacancy{index})-[: has_distance_work]->(distance_work{index})
        CREATE (vacancy{index})-[: in_company]->(company{index})  
    '''

    for i in range(len(vacancy['Cкилы'])):
        query += f'''
            MERGE (skill{index}_{i} :skill{{skill:"{vacancy["Cкилы"][i]}"}})
            MERGE (vacancy{index})-[: need_skill]->(skill{index}_{i})
        '''

    DB.add_vacancy(query)

    if (index != len(vacancies)-1):
        nextVacancy = "Вакансия " + vacancies[index+1].text

    print(str(index+1) + '/' + str(len(vacancies)) + '    ' + str(round((index+1)/len(vacancies), 3)*100) + ' %')

DB.close()
driver.quit()