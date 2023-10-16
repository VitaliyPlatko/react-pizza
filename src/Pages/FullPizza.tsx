import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {useNavigate, useParams } from "react-router";

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>()

  const { id } = useParams()
  const navigate = useNavigate()

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://64bfe44b0d8e251fd111a443.mockapi.io/items/' + id)
        setPizza(data)
      } catch (error) {
        alert('Помилка при отриманні піци')
        navigate('/')
      }
    }
    fetchPizza()
  }, [])

  if (!pizza) {
    return <>Загрузка...</>
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} грн</h4>
        <Link to={"/"}>
          <button className="button button--outline button--add">Повернутись назад</button>
        </Link>
    </div>
  )
}

export default FullPizza