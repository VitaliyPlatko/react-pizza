import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const FullPizzas = () => {
  const [pizza, setPizza] = React.useState()
  const { id } = useParams()
  const navigate = useNavigate()

  React.useEffect(()=>{
    async function fetchPizza(){
      try {
        const {data} = await axios.get('https://64bfe44b0d8e251fd111a443.mockapi.io/items/'+id)
        setPizza(data)
      } catch (error) {
        alert('Помилка при отриманні піци')
        navigate('/')
      }
    }
    fetchPizza()
  },[])

  if (!pizza) {
    return 'Загрузка...';
  }

  return(
    <div className="container">
      <div></div>
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} грн</h4>
    </div>
  )
}

export default FullPizzas