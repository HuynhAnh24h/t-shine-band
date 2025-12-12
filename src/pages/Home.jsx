import React from 'react'
import Hero from '../components/Hero'
import MemberCardList from '../components/MemberCardList'
import VideoGallery from '../components/VideoGallery'
import SponsorsCarousel from '../components/SponsorsCarousel'

const Home = () => {
  return (
    <>
        <Hero/> 
        <MemberCardList/>
        <VideoGallery/>
        {/* <SponsorsCarousel/> */}
    </>
  )
}

export default Home