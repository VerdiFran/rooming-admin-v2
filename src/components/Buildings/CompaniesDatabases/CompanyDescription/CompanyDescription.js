import React from 'react'
import {Card, Col, Descriptions, List, Popover, Row, Statistic, Typography} from 'antd'
import modelImg from '../../../../assets/images/model.png'

/**
 * Description of company.
 */
const CompanyDescription = ({company}) => {
    const {Text} = Typography

    return (
        <Row>
            <Col span={16}>
                <Descriptions size="small" column={1} bordered>
                    <Descriptions.Item label="Город">
                        {
                            company.offices.length
                                ? company.offices.reduce((cities, office) => {
                                    if (!cities.includes(office.city)) {
                                        return [...cities, office.city]
                                    } else {
                                        return cities
                                    }
                                }, []).join(', ')
                                : <Text type="secondary">Город не указан</Text>
                        }
                    </Descriptions.Item>
                    <Descriptions.Item label="Email компании">{company.email}</Descriptions.Item>
                    <Descriptions.Item label="Контактный номер">{company.contactPhone}</Descriptions.Item>
                    <Descriptions.Item label="Офисы">
                        {
                            company.offices.length
                                ? <List size="small" style={{padding: '0'}}>
                                    {
                                        company.offices.slice(0, 2).map(office => <List.Item style={{padding: '0'}}>
                                            {`г. ${office.city}, ул. ${office.street}, д.${office.house}`}
                                        </List.Item>)
                                    }
                                    {
                                        company.offices.length > 2 &&
                                        <List.Item style={{padding: '0'}}>
                                            <Popover
                                                content={company.offices.map(office => <List.Item style={{padding: '0'}}>
                                                    {`г. ${office.city}, ул. ${office.street}, д.${office.house}`}
                                                </List.Item>)}
                                            ><Text type="secondary" style={{fontStyle: 'italic'}}>все офисы</Text>
                                            </Popover>
                                        </List.Item>
                                    }
                                </List>
                                : <Text type="secondary">Офисы не указаны</Text>
                        }
                    </Descriptions.Item>
                </Descriptions>
            </Col>
            <Col span={7} offset={1}>
                <Card style={{height: '100%'}}>
                    <Statistic
                        title="Планировок в базе"
                        value={company.layoutsCount}
                        valueStyle={{fontSize: '26px'}}
                        prefix={<img
                            src={modelImg}
                            alt=""
                            width="20px"
                            height="20px"
                            style={{verticalAlign: 'baseline'}}/>}
                    />
                </Card>
            </Col>
        </Row>
    )
}

export default CompanyDescription
