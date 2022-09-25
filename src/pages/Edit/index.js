import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { Header, InputCustomed, TextAreaCustomd } from '../../components'
import axios from 'axios'

export default function EditPage() {
  const [name, setName] = useState({value : '', error : ''})
  const [desc, setDesc] = useState({value : '', error : ''})
  const [ingrd, setIngrd] = useState({value : '', error : ''})
  const [price, setPrice] = useState({value : '', error : ''})
  const [rate, setRate] = useState({value : '', error : ''})
  const [types, setTypes] = useState({value : '', error : ''})

  const history = useHistory()
  const { id } = useParams()

  useEffect(() => {
    axios.get(`http://localhost:8000/api/food/${id}`)
      .then(res => {
        const data = res.data.data
        setName({value : data.name, error : ''})
        setDesc({value : data.description, error : ''})
        setIngrd({value : data.ingredients, error : ''})
        setPrice({value : data.price, error : ''})
        setRate({value : data.rate, error : ''})
        setTypes({value : data.types, error : ''})
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const save = () => {
    const data = new FormData()
    data.append('name', name.value)
    data.append('description', desc.value)
    data.append('ingredients', ingrd.value)
    data.append('price', price.value)
    data.append('rate', rate.value)
    data.append('types', types.value)

    axios.post(`http://localhost:8000/api/food/${id}`, data)
      .then(res => {
        console.log(res.data.meta.message)
        localStorage.setItem('alert-success', res.data.meta.message)
        history.push('/')
      })
      .catch(err => {
        const response = err.response.data.meta.message
        console.log(response)
      })
  }

  return (
    <div>
      <Header/>
        <div class="container mt-5">
          <h5>Edit Food</h5>

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
