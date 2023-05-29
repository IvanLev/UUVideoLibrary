import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


import Field from "../Field/FIeld";

import { ApiPath } from "../../common/constants";

import { useHttp } from "../../hooks/hooks";

import { PopupContex, UserContext } from "../../context/context";
import s from "./EditProfile.module.css";

function EditProfile() {
  const { user, saveUser } = useContext(UserContext);
  const { setPopupContext } = useContext(PopupContex)
  const avatarInitial = user?.imgPath ? `/images/${user.imgPath}` : `/img/user-img.webp`;
  const [avatar, setAvatar] = useState(avatarInitial);
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: async () => {
      const { lastName, firstName, login, password } = await request(`${ApiPath.userGet}${user.id}`);
      return { lastName, firstName, login, password }
    }
  });
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
    const body = new FormData(e.target);
    body.delete("file");
    if (data.file.length > 0) {
      body.append('file', data.file[0]);
    }

    request(ApiPath.userUpdate, 'POST', body, {}, user.token, true)
      .then(res => {
        saveUser(res);
        setPopupContext(state => ({ ...state, isOpen: false }));
        setIsCreated(true);
      })
      .catch(e => console.log(e));
  }

  if (isCreated) {
    return (
      <div>
        <p className={s.title}>User data is changed !</p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={s.form}
    >
      <label id="file" className={s.labelFile}>
        <div className={s.avatar}>
          <img src={avatar} alt="avatar" />
          <span className={s.uploadIcon}>
            <img src="/img/upload.png" alt="upload" />
          </span>
        </div>
        <input
          {...register('file', {
            onChange: (e) => {
              const file = e.target.files[0];
              setAvatar(URL.createObjectURL(file));
            }
          })}
          type="file"
          className={s.file}
        />
      </label>
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
      {error && <span className={s.error}>{error.message}</span>}
      <input
        className={s.submit}
        type="submit"
        value="save"
      />
    </form>
  );
};

export default EditProfile;