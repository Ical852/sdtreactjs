import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { Header, InputCustomed } from '../../components'
import axios from 'axios'

export default function EditPicPage() {
  const [img, setImg] = useState({value : '', error : ''})
  const [imgUrl, setImgUrl] = useState('')

  const history = useHistory()
  const { id } = useParams()

  useEffect(() => {
    axios.get(`http://localhost:8000/api/food/${id}`)
      .then(res => {
        const data = res.data.data
        setImg({value : data.picture_path, error : ''})
        setImgUrl(data.picture_path)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const save = () => {
    const data = new FormData()
    data.append('picture_path', img.value)

    axios.post(`http://localhost:8000/api/food/photo/${id}`, data)
      .then(res => {
        console.log(res.data.meta.message)
        localStorage.setItem('alert-success', res.data.meta.message)
        history.push('/')
      })
      .catch(err => {
        const response = err.response.data.meta.message
        response &&
        response.picture_path != undefined && setImg({value : img.value, error : response.picture_path[0]})
      })
  }

  return (
    <div>
      <Header/>
        <div class="container mt-5">
          <h5>Edit Food</h5>

          <form class="forms-sample mt-3">

              <p>Current Image : </p>
              <img src={imgUrl} alt="" srcset="" style={{ width : '100px' }}/>

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
                      Save</button>
                  <Link to="/" class="btn btn-danger mx-2"><i class="ti-close"></i>
                      Cancel</Link>
              </div>
          </form>
      </div>
    </div>
  )
}
