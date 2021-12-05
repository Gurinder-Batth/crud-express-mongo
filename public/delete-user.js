const title = document.getElementById("title")
const delete_link = document.getElementById("delete_link")
const deleteUser = (item) => 
{
    title.innerHTML = item.name
    delete_link.href = "/user/delete/"+item._id
}