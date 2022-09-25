import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../../components'
import axios from 'axios'

export default function DataPage() {
  const [data, setData] = useState([])
  const [alert, setAlert] = useState({
    type : '',
    message : ''
  })

  const getData = () => {
    axios.get("http://localhost:8000/api/food")
      .then(res => {
        setData(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const deleteData = (id) => {
    const confirm = window.confirm('delete data?')
    if (confirm) {
      axios.delete(`http://localhost:8000/api/food/${id}`)
        .then(res => {
          const newData = data.filter(data => data.id != id)
          setData(newData)
          setAlertFunc('success', 'Delete Data Success')
        })
        .catch(err => {
          console.log(err)
          setAlertFunc('danger', 'Delete Failed')
        })
    }
  }

  const setAlertFunc = (type, message) => {
    setAlert({
      type : type,
      message: message
    })
    setTimeout(() => {
      setAlert({
        type: '',
        message: ''
      })
    }, 2000);
  }

  useEffect(() => {
    const alertmsg = localStorage.getItem('alert-success')
    if (alertmsg != 'null') {
      setAlertFunc('success', alertmsg)
      localStorage.setItem('alert-success', null)
    }
    getData()
  }, [])

  return (
    <div>
      <Header/>
      <div class="container mt-5 mb-5">
        {
          alert.type != '' &&
          <div class={`alert alert-${alert.type}`} role="alert">
            {alert.message}
          </div>
        }
        <Link to={"/create"}>
            <button class="btn btn-primary"><i class="fa fa-plus"></i> New Food</button>
        </Link>
        <table class="table table-striped table-responsive mt-3">
            <thead>
                <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Ingredients</th>
                    <th scope="col">Price</th>
                    <th scope="col">Rate</th>
                    <th scope="col">Types</th>
                    <th scope="col">Picture</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
              {
                data.length > 0 ?
                data.map((item, index) => {
                  return (
                    <tr key={item.id}>
                            <th scope="row">{index+1}</th>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.ingredients}</td>
                            <td>Rp. { new Intl.NumberFormat('en-US').format(item.price) }</td>
                            <td>{item.rate}</td>
                            <td>{item.types}</td>
                            <td>
                                <img src={item.picture_path} alt="" height="100" width="100"/>
                            </td>
                            <td>
                                <Link to={`/edit/${item.id}`}>
                                    <button class="btn btn-success"><i class="fa fa-edit"></i> Edit</button>
                                </Link>
                                <Link to={`/editpic/${item.id}`}>
                                    <button class="btn btn-info text-white mt-2 mb-2"><i class="fa fa-image"></i> Picture
                                        Edit</button>
                                </Link>
                                <button type="button" class="btn btn-danger" onClick={() => deleteData(item.id)}><i class="fa fa-trash"></i> Delete</button>
                            </td>
                        </tr>
                  )
                }) : <h5>Loading Data</h5>
              }
            </tbody>
        </table>
    </div>
    </div>
  )
}
