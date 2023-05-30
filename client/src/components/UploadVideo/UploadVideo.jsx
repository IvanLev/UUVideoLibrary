import { useContext, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { UserContext } from '../../context/context';

import { useHttp } from '../../hooks/hooks';

import Field from '../Field/FIeld';

import { ApiPath } from '../../common/constants';

import s from './UploadVideo.module.css';



function UploadVideo({ handleClosePopup }) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { user } = useContext(UserContext)
  const [isComplite, setIsComplite] = useState(false);

  const { request, error } = useHttp();
  const [genreList, setGenreList] = useState([]);

  useEffect(() => {
    console.log(errors)
  }, [errors])

  const option = {
    name: {
      required: "Name is required",
      maxLength: {
        value: 50,
        message: "Name must be less than 50 characters"
      }
    },
    genreId: {
      required: "Genre is required",
    },
    link: {
      required: "Link is required",
      pattern: {
        value: /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/,
        message: 'Link format is not valid'
      }
    },
    description: {
      requred: false
    }
  }

  useEffect(() => {
    request(ApiPath.genreList)
      .then(res => setGenreList(res))
      .catch(e => console.log(e));
  }, [])

  const onSubmit = (data, e) => {
    const body = {
      ...data,
      creator: `${user.firstName} ${user.lastName}`,
    }
    request(ApiPath.verificationCreate, "POST", body)
      .then(res => setIsComplite(true))
      .catch(e => console.log(e));
    e.preventDefault();
    console.log(data)
  }

  if (isComplite) {
    return <h2 className={s.uploadTitle}>Data is created</h2>
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={s.form}
    >
      <h2 className={s.uploadTitle}>Upload video</h2>
      <Field
        labelText="Name *"
        name="name"
        register={register}
        options={option.name}
        errors={errors}
      />
      <div className={s.field}>
        <label
          htmlFor="genre"
          className={s.label}
        >
          Genre *
        </label>
        <select
          id="genre"
          className={s.select}
          {...register("genreId", { ...option.genreId })}
        >
          <option value="" disabled ></option>
          {genreList.map(({ name, id }) => (
            <option
              key={id}
              value={id}
            >
              {name}
            </option>
          ))}
        </select>
      </div>
      <Field
        labelText="YouTube video Link *"
        name="link"
        register={register}
        options={option.link}
        errors={errors}
      />
      <Field
        labelText="Description (optional)"
        name="description"
        register={register}
        options={option.description}
        errors={errors}
      />
      {error && <span className={s.error}>{error.message}</span>}
      <input
        className={s.submit}
        type="submit"
        value="upload"

      />
    </form>
  )
}

export default UploadVideo;