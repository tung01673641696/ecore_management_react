import React from 'react'
import MainContainer from '../../components/layout/MainContainer'
import { Header } from '../../components'
import style from "../../styles/pages/_status_service.module.scss"
import { Card } from 'antd';
import "../../styles/pages/global.scss"

function StatusService() {
  const data = [
    {
      name: "Group 1",
      services: [
        {
          "serviceName": "service 1.1",
          "status": "Up",
          "lastCheckedTime": "10:10 22/02/2023",
          "lastUpTime": "10:10 22/02/2023",
          "lastDownTime": "10:10 22/02/2023",
          "responseTime": "10:10 22/02/2023",
        },
        {
          "serviceName": "service 1.2",
          "status": "Up",
          "lastCheckedTime": "10:10 22/02/2023",
          "lastUpTime": "10:10 22/02/2023",
          "lastDownTime": "10:10 22/02/2023",
          "responseTime": "10:10 22/02/2023",
        }
      ]
    },

    {
      name: "Group 2",
      services: [
        {
          "serviceName": "service 2.1",
          "status": "Up",
          "lastCheckedTime": "10:10 22/02/2023",
          "lastUpTime": "10:10 22/02/2023",
          "lastDownTime": "10:10 22/02/2023",
          "responseTime": "10:10 22/02/2023",
        },
        {
          "serviceName": "service 2.2",
          "status": "Up",
          "lastCheckedTime": "10:10 22/02/2023",
          "lastUpTime": "10:10 22/02/2023",
          "lastDownTime": "10:10 22/02/2023",
          "responseTime": "10:10 22/02/2023",
        }
      ]
    },
  ]

  return (
    <MainContainer>

      <Header category="Page" title="Status Service" />

      <div className={style.status_service}>

        {
          data?.map((item) => (
            <div>
              <Header title={item.name} />
              <div>
                {item?.services?.map((itemChild) => (
                  <div className={style.status_service_box}>
                    <Card className={`${style.status_service_car} ant-card`} title={itemChild.serviceName} bordered={false}>
                      <p>Status: <span></span></p>
                      <p>Last check</p>
                      <p>Last uptime</p>
                      <p>Response time</p>
                      <p></p>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          ))
        }

      </div>
    </MainContainer>
  )
}

export default StatusService