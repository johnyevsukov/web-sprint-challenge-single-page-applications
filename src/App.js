import React, { useState, useEffect } from 'react';
import { Route, Link, Switch } from 'react-router-dom'
import axios from 'axios'
import Home from './Home'
import Form from './Form'
import schema from "./validation/formSchema";
import * as yup from "yup";

// My cypress tests are in cypress/integration/examples/form.spec.js

const initialFormValues = {
  name: "",
  size: "",
  special: "",
  onions: false,
  mushrooms: false,
  olives: false,
  pepperoni: false,
};

const initialFormErrors = {
  name: "",
};

const initialOrders = [];
const initialDisabled = true;

const App = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  const postNewOrder = (newOrder) => {
    axios
      .post("https://reqres.in/api/orders", newOrder)
      .then((res) => {
        console.log(res.data)
        setOrders([res.data, ...orders]);
        setFormValues(initialFormValues);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const inputChange = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });
      // console.log(formValues)
    setFormValues({
      ...formValues,
      [name]: value,
    });
    // console.log(formValues)
  };

  const formSubmit = () => {
    const newOrder = {
      name: formValues.name.trim(),
      size: formValues.size.trim(),
      special: formValues.special.trim(),
      mushrooms: formValues.mushrooms,
      olives: formValues.olives,
      onions: formValues.onions,
      pepperoni: formValues.pepperoni,
    };
    postNewOrder(newOrder);
  };

  useEffect(() => {
    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <>
    <header>
      <h2>LAMBDA EATS</h2>
      <Link to={'/'}>
        <button>Home</button>
      </Link>
      </header>
      <Switch>
        <Route path='/pizza'>
            <Form
              values={formValues}
              change={inputChange}
              submit={formSubmit}
              disabled={disabled}
              errors={formErrors}
            />
        </Route>
        <Route path='/'>
            <Home />
        </Route>
      </Switch>
    </>
  );
};
export default App;
