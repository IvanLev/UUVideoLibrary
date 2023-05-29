import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import Field from "../Field/FIeld";

import { ApiPath, AppRoute } from "../../common/constants";
import { UserContext } from "../../context/context";

import { useHttp } from "../../hooks/hooks";

import s from "./SignIn.module.css";




function SignIn() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { request, error } = useHttp();
  const navigate = useNavigate()
  const { saveUser } = useContext(UserContext)

  const option = {
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
    request(ApiPath.signIn, 'POST', data)
      .then(res => {
        saveUser(res);
        navigate(AppRoute.MAIN);
      })
      .catch(e => console.log(e));
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={s.form}
    >
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
      <p>Don't have accont? <Link to={AppRoute.SIGN_UP}>register</Link></p>
      {error && <span className={s.error}>{error.message}</span>}
      <input
        className={s.submit}
        type="submit"
        value="sign in"
      />
    </form>
  );
};

export default SignIn;