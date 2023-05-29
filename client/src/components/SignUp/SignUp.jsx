import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, NavLink, useNavigate } from "react-router-dom";


import Field from "../Field/FIeld";

import { ApiPath, AppRoute } from "../../common/constants";

import { useHttp } from "../../hooks/hooks";

import s from "./SignUp.module.css";

function SignUp() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { request, error } = useHttp();
  const navigate = useNavigate()
  const [isCreated, setIsCreated] = useState(false);

  const option = {
    firstName: {
      required: "First name is required",
    },
    lastName: {
      required: "Last name is required",
    },
    login: {
      required: "Login is required",
      pattern: {
        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        message: 'Login format is not valid'
      }
    },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must be longer than 8 characters"
      },
      maxLength: {
        value: 30,
        message: "Password must be less than 30 characters"
      }
    },
  }

  const onSubmit = (data, e) => {
    e.preventDefault();
    request(ApiPath.signUp, 'POST', data)
      .then(res => {
        setIsCreated(true);
      })
      .catch(e => console.log(e));
  }

  if (isCreated) {
    return (
      <div>
        <p>Account created!</p>
        <NavLink to={AppRoute.SIGN_IN}>Click to sign in</NavLink>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={s.form}
    >
      <Field
        labelText="First Name"
        name="firstName"
        register={register}
        errors={errors}
        options={option.firstName}
      />
      <Field
        labelText="Last Name"
        name="lastName"
        register={register}
        errors={errors}
        options={option.lastName}
      />
      <Field
        labelText="Login"
        name="login"
        register={register}
        errors={errors}
        options={option.login}
      />
      <Field
        labelText="Password"
        name="password"
        type="password"
        register={register}
        errors={errors}
        options={option.password}
      />
      <p>You have accont? <Link to={AppRoute.SIGN_IN}>login</Link></p>
      {error && <span className={s.error}>{error.message}</span>}
      <input
        className={s.submit}
        type="submit"
        value="sign up"
      />
    </form>
  );
};

export default SignUp;