import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Header, InputCustomed, TextAreaCustomd } from '../../components'
import axios from 'axios'
export default function CreatePage() {
  const [name, setName] = useState({value : '', error : ''})
  const [desc, setDesc] = useState({value : '', error : ''})
  const [ingrd, setIngrd] = useState({value : '', error : ''})
  const [price, setPrice] = useState({value : '', error : ''})
  const [rate, setRate] = useState({value : '', error : ''})
  const [types, setTypes] = useState({value : '', error : ''})
  const [img, setImg] = useState({value : '', error : ''})

  const history = useHistory()

  const save = () => {
    const data = new FormData()
    data.append('name', name.value)
    data.append('description', desc.value)
    data.append('ingredients', ingrd.value)
    data.append('price', price.value)
    data.append('rate', rate.value)
    data.append('types', types.value)
    data.append('picture_path', img.value)

    axios.post('http://localhost:8000/api/food', data)
      .then(res => {
        console.log(res.data.meta.message)
        localStorage.setItem('alert-success', res.data.meta.message)
        history.push('/')
      })
      .catch(err => {
        const response = err.response.data.meta.message
        response &&
        response.name != undefined && setName({value : name.value, error : response.name[0]})
        response.description != undefined && setDesc({value : desc.value, error : response.description[0]})
        response.ingredients != undefined && setIngrd({value : ingrd.value, error : response.ingredients[0]})
        response.price != undefined && setPrice({value : price.value, error : response.price[0]})
        response.rate != undefined && setRate({value : rate.value, error : response.rate[0]})
        response.types != undefined && setTypes({value : types.value, error : response.types[0]})
        response.picture_path != undefined && setImg({value : img.value, error : response.picture_path[0]})
      })
  }

  return (
    <div>
      <Header/>
        <div class="container mt-5">
          <h5>Create New Food</h5>

          <form class="forms-sample mt-3">
              <InputCustomed
                type={"text"}
                label={"Name"}
                value={name.value}
                error={name.error != ''}
                errMsg={name.error}
                onChange={(e) => setName({
                  value : e.target.value,
                  error : ''
                })}
                autofocus
              />

              <TextAreaCustomd
                type={"text"}
                label={"Description"}
                value={desc.value}
                error={desc.error != ''}
                errMsg={desc.error}
                onChange={(e) => setDesc({
                  value : e.target.value,
                  error : ''
                })}
              />

              <TextAreaCustomd
                type={"text"}
                label={"Ingredients"}
                value={ingrd.value}
                error={ingrd.error != ''}
                errMsg={ingrd.error}
                onChange={(e) => setIngrd({
                  value : e.target.value,
                  error : ''
                })}
              />

              <InputCustomed
                type={"number"}
                label={"Price"}
                value={price.value}
                error={price.error != ''}
                errMsg={price.error}
                onChange={(e) => setPrice({
                  value : e.target.value,
                  error : ''
                })}
              />

              <InputCustomed
                type={"number"}
                label={"Rate"}
                value={rate.value}
                error={rate.error != ''}
                errMsg={rate.error}
                onChange={(e) => setRate({
                  value : e.target.value,
                  error : ''
                })}
              />

              <InputCustomed
                type={"text"}
                label={"Types"}
                value={types.value}
                error={types.error != ''}
                errMsg={types.error}
                onChange={(e) => setTypes({
                  value : e.target.value,
                  error : ''
                })}
              />

              <InputCustomed
                type={"file"}
                label={"Image"}
                error={img.error != ''}
                errMsg={img.error}
                onChange={(e) => setImg({
                  value : e.target.files[0],
                  error : ''
                })}
              />

              <div class="mt-3">
                  <button type="button" class="btn btn-primary" onClick={() => save()}><i class="ti-save"></i>
                      Add</button>
                  <Link to="/" class="btn btn-danger mx-2"><i class="ti-close"></i>
                      Cancel</Link>
              </div>
          </form>
      </div>
    </div>
  )
}
