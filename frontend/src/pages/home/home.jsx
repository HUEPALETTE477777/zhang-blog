import React from 'react';
import Hero from "../home/hero"
import Blogs from "../blogs/blogs"

const Home = () => {
  return (
    <div className='container text-primary mx-auto mt-6 p-10 '>
      <Hero />
      <Blogs />
    </div>
  );
}

export default Home;
