import { gql } from "@apollo/client";
import { useState } from "react";
import client from "../appolo/appolo";
import style from "../styles/index.module.css";
import Link from "next/link";

export default function Home({ data }) {
  const [number, setNumber] = useState(10);

  return (
    <div className={style.block}>
      <h1 className={style.title}>Страница роботов</h1>
      <ul className={style.list}>
        {data.data.robots.map((el, id) =>
          id >= number ? null : (
            <li className={style.listItem} key={el.id}>
              <Link href={`/robot/${el.id}`}>
                <a className={style.link}>
                  <p>code: {el.code}</p> <p>Id: {el.id}</p>
                </a>
              </Link>
            </li>
          )
        )}
      </ul>
      {data.data.robots.length - 1 < number ? null : (
        <div className={style.btn}>
          <button onClick={() => setNumber((num) => num + 10)}>
            Показать еще
          </button>
        </div>
      )}
    </div>
  );
}

export async function getStaticProps(context) {
  const data = await client.query({
    query: gql`
      query MyQuery {
        robots {
          code
          id
        }
      }
    `,
  });

  return {
    props: {
      data,
    },
  };
}
