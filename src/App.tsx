import React, { Suspense } from "react";
import { Route, Routes } from "react-router";
import Loadable from 'react-loadable';
import Home from "./Pages/Home";
import MainLayout from './Layouts/MainLayout';

import './scss/app.scss'

//const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './Pages/Cart'))

const Cart = Loadable({
  /* Тут я вказую що я буду грузити через lazy-loading */
  loader: () => import(/* webpackChunkName: "Cart" */ './Pages/Cart'),
  /* Тут я вказую що буде рендеритись поки йде лінива підгрузка */
  loading: () => <div>Загрузка корзини...</div>,
});

const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ './Pages/FullPizza'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './Pages/NotFound'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={
          <Suspense fallback={<div>Загрузка Home...</div>}>
            <Home />
          </Suspense>} />
        <Route path="/cart" element={
          <Suspense fallback={<div>Загрузка корзини...</div>}>
            <Cart />
          </Suspense>} />
        <Route path="/pizza/:id" element={
          <Suspense fallback={<div>Загрузка піци...</div>}>
            <FullPizza />
          </Suspense>} />
      </Route>
    </Routes>
  );
}

export default App;