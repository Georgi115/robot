import { useRouter } from "next/router";
import { gql } from "@apollo/client";
import client from "../../appolo/appolo";
import { useState } from "react";
import style from "../../styles/details.module.css";

export default function robotDetails({ data }) {
  const { query } = useRouter();
  const date = data.data.robots.find(
    (el) => el.robot_settings.robot.id === query.id
  );
  const [robot, setRobot] = useState(date.robot_settings.robot);
  const arrEntries = Object.entries(robot);

  const changeInput = (el, val) => {
    const obj = { ...robot };
    robot[el[0]] = val;
    setRobot(obj);
  };
  return (
    <div>
      <h1 className={style.title}>Детальная информация</h1>
      <ul className={style.blockForm}>
        {arrEntries.map((el, idx) => {
          return (
            <li key={idx}>
              <p>{el[0]}</p>
              <input
                onChange={(e) => changeInput(el, e.target.value)}
                value={el[1]}
              ></input>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export const getServerSideProps = async () => {
  const data = await client.query({
    query: gql`
      query MyQuery {
        robots {
          robot_settings {
            robot {
              name
              mod
              id
              exchange
              currency
              code
              available
              asset
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      data,
    },
  };
};
