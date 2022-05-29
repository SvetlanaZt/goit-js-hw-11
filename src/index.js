import './sass/main.scss';
import axios from "axios";
import template from './template/img.hbs';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';



const form = document.querySelector('.search-form')
const list = document.querySelector('.gallery')
const loaMore = document.querySelector('.load-more')

form.addEventListener('submit', onClick)
loaMore.addEventListener('click', onLoadMore)

let element = ''

function onClick(evt) {
  evt.preventDefault()
  element = evt.target.searchQuery.value;
  addPost(element)
}

 function addPost(element) {
  axios.get(`https://pixabay.com/api/?key=27593134-a882df11ea431345edf986e72&q=${element}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=40`)
    .then(function (response) {
      renderImg(response)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
}

function renderImg(name) {
  if (name.data.total === 0) {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
  } else {
    const addImg = template(name);
    return list.innerHTML = addImg;
  }

}
 
let currentPage = 1
function onLoadMore() {
  currentPage += 1
   axios.get(`https://pixabay.com/api/?key=27593134-a882df11ea431345edf986e72&q=${element}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=40`)
    .then(function (response) {
      renderImg(response)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  
}

 var lightbox = new SimpleLightbox('.gallery a', { 
    captionDelay: 250,
   close: true,
   enableKeyboard: true,
   swipeClose: true,
    showCounter: true,
 });



// пример с FormData
// const post = {};
//   const formData = new FormData(evt.target)
//   formData.forEach((value, name) => {
//     post[name] = value;
//   })
//   addPost(post);
//   console.log(post)
// }