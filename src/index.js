import './sass/main.scss';
import axios from "axios";
// import { addPost } from './api/api'
import template from './template/img.hbs';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';



const form = document.getElementById('search-form')
const list = document.querySelector('.gallery')
const loaMore = document.querySelector('.load-more')

form.addEventListener('submit', onClick)
loaMore.addEventListener('click', onLoadMore)

loaMore.classList.add('is-hidden')

 var lightbox = new SimpleLightbox('.gallery__link', { 
  overlayOpacity: 0.4,
  animationSpeed: 100,
 });

let element = ''

function onClick(evt) {
  evt.preventDefault()
  element = evt.target.searchQuery.value;
  addPost(element)
  if (element === '') {
    list.innerHTML='';
  }
}
const perPage = '40'

function addPost(element) {
  try {
    const key = '27593134-a882df11ea431345edf986e72'
     axios.get(`https://pixabay.com/api/?key=${key}&q=${element}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=${perPage}`)
      .then(function (response) {
        renderImg(response)
      })
  }
  catch (error) {
      // handle error
      console.log(error);
    }
}
let totalPages = ''

function renderImg(name) {

  if (name.data.totalHits > perPage) {
    loaMore.classList.remove('is-hidden');
    lightbox.refresh();
  }if (name.data.total === 0) {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
  }else {
    const addImg = template(name);
    return list.innerHTML = addImg;
  }
  
}
      
let currentPage = 1
function onLoadMore(e) {
  currentPage += 1
  addPost(currentPage)
    // totalPages = Math.floor(name.data.totalHits / perPage)
    //  if (currentPage > totalPages) {
    //     loaMore.style.display = 'none';
    //     Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
  //  }
}





// пример с FormData
// const post = {};
//   const formData = new FormData(evt.target)
//   formData.forEach((value, name) => {
//     post[name] = value;
//   })
//   addPost(post);
//   console.log(post)
// }