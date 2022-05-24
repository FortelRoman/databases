import neo4j from 'neo4j-driver'
import { useState } from 'react';
import FormComponent from './form-add';

import {List} from  'antd';

const App = () => {


    const [data, setData] = useState([]);

    const handlerClick = async (evt) => {

        const uri = 'neo4j+s://ec77a2e7.databases.neo4j.io';
        const user = 'neo4j';
        const password = '6Kp8TlP7-g-KH1qbLGkIWYObwThXeYW7fYueK8ipiPA';

        const driver = neo4j.driver(uri, neo4j.auth.basic(user, password))
        const session = driver.session()

        const items = []


        try {

            const readQuery = `CREATE OR REPLACE DATABASE my1`
            const readResult = await session.writeTransaction(tx =>
                tx.run(readQuery)
            )
            readResult.records.forEach(record => {
                items.push(record.get('vacancyTitle'))
            })


            setData(items)
        } catch (error) {
            console.error('Something went wrong: ', error)
        } finally {
            await session.close()
        }

        // Don't forget to close the driver connection when you're finished with it
        await driver.close()
    }

    return (
        <>
            <button onClick={handlerClick}>Button</button>


            <List
                bordered
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                       {item}
                    </List.Item>
                  )}
            />

            <FormComponent></FormComponent>

        </>
    )
}

export default App;
