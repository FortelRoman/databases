import neo4j from 'neo4j-driver'
const uri = 'neo4j+s://ec77a2e7.databases.neo4j.io';
const user = 'neo4j';
const password = '6Kp8TlP7-g-KH1qbLGkIWYObwThXeYW7fYueK8ipiPA';

export default class devbyService {

    static async readQuery(query, params = {}) {

        const driver = neo4j.driver(uri, neo4j.auth.basic(user, password))
        const session = driver.session()

        try {

            return await session.writeTransaction(tx =>
                tx.run(query, { ...params })
            )
        }
        catch (error) {
            console.error('Something went wrong: ', error)
        }
        finally {
            await session.close()
        }

        await driver.close()
    }

    static async getCount(object) {

        const query = `MATCH (n:${object}) RETURN COUNT(n) as count`;
        const response = await devbyService.readQuery(query);
        return response.records[0].get('count');
    }

    static async getVacancies() {

        const query = `MATCH (n: vacancy) RETURN n.vacancy as title, id(n) as id`
        const items = [];
        const result = await devbyService.readQuery(query);

        result.records.forEach(record => {
            items.push({
                title: record.get('title'),
                id: Number(record.get('id'))
            })
        })

        return items
    }

    static async getAverageStartSalary() {

        const query = `
            MATCH (a:vacancy) WHERE a.salary_from <> -1 
            MATCH (b:vacancy) WHERE b.salary_to <> -1 
            MATCH (c:vacancy) WHERE c.salary_to <> -1 AND c.salary_from <> -1
            
            RETURN 
            AVG(a.salary_from) AS averageFrom, 
            AVG(b.salary_to) AS averageTo, 
            SUM(c.salary_from + c.salary_to)/(2*count(c)) as average,
            MIN(a.salary_from) as minFrom,
            MAX(a.salary_from) as maxFrom,
            MIN(b.salary_to) as minTo,
            MAX(b.salary_to) as maxTo
        `

        const response = await devbyService.readQuery(query);


        if (response) {
            return {
                averageFrom: response.records[0].get('averageFrom'),
                averageTo: response.records[0].get('averageTo'),
                average: response.records[0].get('average'),
                minFrom: response.records[0].get('minFrom'),
                maxFrom: response.records[0].get('maxFrom'),
                minTo: response.records[0].get('minTo'),
                maxTo: response.records[0].get('maxTo'),
            }
        }

        return {
            averageFrom: 0,
            averageTo: 0,
            average: 0,
            minFrom: 0,
            maxFrom: 0,
            minTo: 0,
            maxTo: 0,
        }
    }


    static async getLevelCount() {

        const query = `match (a:vacancy) - [:has_level] -> (b:level) return  b.level as title, count(a) as count ORDER BY count(a) desc`
        const response = await devbyService.readQuery(query);
        const result = []

        response.records.forEach(record => {
            result.push({
                key: result.length,
                title: record.get('title'),
                count: Number(record.get('count'))
            })
        })

        return result;


    }

    static async getSpecializationCount() {

        const query = `match (a:vacancy) - [:has_specialization] -> (b:specialization) return  b.specialization as title, count(a) as count ORDER BY count(a) desc`
        const response = await devbyService.readQuery(query);
        const result = []

        response.records.forEach(record => {
            result.push({
                key: result.length,
                title: record.get('title'),
                count: Number(record.get('count'))
            })
        })

        return result;


    }

    static async getCityCount() {

        const query = `match (a:vacancy) - [:located_in] -> (b:city) return  b.city as title, count(a) as count ORDER BY count(a) desc`
        const response = await devbyService.readQuery(query);
        const result = []

        response.records.forEach(record => {
            result.push({
                key: result.length,
                title: record.get('title'),
                count: Number(record.get('count'))
            })
        })

        return result;


    }

    static async getEnglishCount() {

        const query = `match (a:vacancy) - [:has_english_level] -> (b:english_level) return  b.english_level as title, count(a) as count ORDER BY count(a) desc`
        const response = await devbyService.readQuery(query);
        const result = []

        response.records.forEach(record => {
            result.push({
                key: result.length,
                title: record.get('title'),
                count: Number(record.get('count'))
            })
        })

        return result;


    }

    static async getExperienceCount() {

        const query = `match (a:vacancy) - [:has_experience] -> (b:experience) return  b.experience as title, count(a) as count ORDER BY count(a) desc`
        const response = await devbyService.readQuery(query);
        const result = []

        response.records.forEach(record => {
            result.push({
                key: result.length,
                title: record.get('title'),
                count: Number(record.get('count'))
            })
        })

        return result;
    }

    static async searchVacansies({ text, city, specialization, level, salary }) {

        let query = "MATCH (vacancy:vacancy)";

        if (text) {
            query += `
                WITH vacancy
                MATCH (vacancy:vacancy) - [:in_company] -> (company:company) WHERE (toLower(vacancy.vacancy) CONTAINS toLower("${text}") OR toLower(company.company) CONTAINS toLower("${text}") )
            `
        }

        if (city) {
            query += `
                WITH vacancy
                MATCH (vacancy) - [:located_in] -> (city: city) WHERE (city.city = "${city}")
            `
        }

        if (specialization) {
            query += `
                WITH vacancy
                MATCH (vacancy) - [:has_specialization] -> (specialization: specialization) WHERE (specialization.specialization = "${specialization}")
            `
        }

        if (level) {
            query += `
                WITH vacancy
                MATCH (vacancy) - [:has_level] -> (level: level) WHERE (level.level = "${level}")
            `
        }
        if (salary) {
            query += `
                WITH vacancy
                MATCH (vacancy) WHERE ((vacancy.salary_from <= ${salary} AND vacancy.salary_to >= ${salary}) OR (vacancy.salary_to = -1 AND vacancy.salary_from <= ${salary} AND vacancy.salary_from <> -1))
            `
        }


        query += "RETURN vacancy.vacancy as title, id(vacancy) as id"

        const response = await devbyService.readQuery(query);

        const result = []

        if (response) {
            response.records.forEach(record => {
                result.push({
                    title: record.get('title'),
                    id: Number(record.get('id'))
                })
            })
        }

        return result;
    }


    static async getVacancy(id) {

        const query = `
        
        MATCH (vacancy: vacancy) WHERE (id(vacancy) = $id) 
        MATCH (vacancy) - [] -> (other)
        
        RETURN vacancy{.*} as vacancy, collect(other{.*}) as other, id(vacancy) as id
        `

        let result = {}

        const response = await devbyService.readQuery(query, { id });

        result = { ...response.records[0].get('vacancy') }

        result.skills = []

        response.records[0].get('other').forEach((el, index) => {
            if (el.skill) {
                result.skills.push({ key: index, value: el.skill })
            }
            else {
                result = { ...result, ...el }
            }
        })

        result = { ...result, id: response.records[0].get('id') }

        return result;
    }
}

