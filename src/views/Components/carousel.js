import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  Row,
  Col
} from 'reactstrap';
import { Link } from 'react-router-dom';



const items = [
  {
    src: require('../../assets/img/group6309.svg'),
    altText: 'Slide 1',
    caption: 'Slide 1',
   title:'Welcome to your trial of the DrDDS Database.',
    content:'Play around, make mistakes, Learn how the DrDDS Dental Database works.',
    li1:'Create custom reports',
    li2:'Check out our standard reports',
    li3:'Exports up to 50 contacts for free',
    link:'Schedule a personalized demo'
  },
  {
    src: require('../../assets/img/group6810.svg'),
    altText: 'Slide 2',
    caption: 'Slide 2',
    title:'Manage your reports in your reporting list.',
    content:'You can create new reports and manage any existing reports you have in your portal using your reports list.',
    li1:'Standard reports',
    li2:'Custom reports'
  },
  {
    src:require('../../assets/img/group6260.svg'), 
    altText: 'Slide 3',
    caption: 'Slide 3',
    title:'The largest and most updated dental database on the planet.',
    content:'Our database is filled with over 152,000 practices, contacts, specialties right at your fingertips',
    li1:'Display updated to our data',
    li2:'The largest set of dental data you can find',
    li3:'The most usable interface around'
  }
];

const Customcarousel = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
 
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
      <Row>
        <Col md={{size: 7, order: 1 }}  sm={{size:7 ,order:1} } xs={{size:12 ,order:2}} > 
            <div className="content py-0">
                {item && item.title && <h1 className="f-600 ph-1">{item.title}</h1>}
                {item && item.content && <p className="f-300 my-md-3 mt-2"> {item.content} </p>}
                {item && item.li1 && 
                  <ul className="carousel-bullet mb-md-3 mb-3">
                  {item && item.li1 &&<li className="">{item.li1}</li>}
                  {item && item.li2 &&<li className="">{item.li2}</li>}
                  {item && item.li3 &&<li className="">{item.li3}</li>}
                  </ul>
                  }
                  {item && item.link &&<div className="pt-md-3 pt-2"><Link className="h3 text-purple" to="https://calendly.com/rodgers/databasedemo" target="_blank">
                  {item.link}
                  </Link></div>}                   
            </div>
        </Col>
          <Col md={{size: 5, order: 2 }}  sm={{size:5 ,order:2}} xs={{size:12 ,order:1}}>
          <div className="text-center">
            <div className="content-image">
              <img src={item.src}  className="img-fluid" alt={item.altText} />
            </div>
          </div>
          </Col>
        </Row>
        </CarouselItem>
    );
  });

  return (
<div>
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      >
      <div className="indicator d-flex align-items-center py-2">
        <div className="carousel-indicators d-inline-flex">
          <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
        </div>  
      </div>
      {slides}
      </Carousel>
      <div className="slider-carousel">
        <div className=" text-right">
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
        </div>
      </div>  
    </div>
  );
}

export default Customcarousel;