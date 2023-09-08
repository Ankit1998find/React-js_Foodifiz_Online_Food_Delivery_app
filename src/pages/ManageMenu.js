import React from 'react'

const ManageMenu = () => {
  return (
    <>
    <div className="container menu-container">
    <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Kitchen Name</th>
      <th scope="col">Food Heading</th>
      <th scope="col">Food Description</th>
      <th scope="col">Food Price</th>
      <th scope="col">Image URL</th>
      <th scope="col">Food Rating</th>
      <th scope="col">Remove Menu</th>
      <th scope="col">Update Menu</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td>@mdo</td>
      <td>@mdo</td>
      <td>@mdo</td>
      <td><button className='btn btn-danger'>Remove</button></td>
      <td><button className='btn btn-success'>Update</button></td>
    </tr>

  </tbody>
</table>
    </div>
    </>
  )
}

export default ManageMenu