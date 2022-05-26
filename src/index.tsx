import React, { MouseEvent, useCallback, useEffect, useRef, useState } from "react";

import styled from 'styled-components'

interface CaroselParams {
  children: any
  max_width?: number
}

const ContainerRelativo = styled.div<{max?: number}>`
  position: relative;
  max-width: ${({max}) => `${max}px`};
  width: 100%;
`

const Container = styled.div`
  margin: auto;
  max-width: 1200px;
  width: 90vw;
  overflow-x: scroll;
  display: flex;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }

  .buttons {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    display: flex;
    justify-content: space-between;
    max-width: 100%;
    width: 100%;

    button {
      background: #00000000;
      border: none;
      width: 20px;
      height: 20px;
      cursor: pointer;
    }

    .prev {
      transform: translateX(10px);
    }

    .next {
      transform: translateX(-10px);
    }
  }
`

interface StateCaroselParams {
  width_carosel?: number
  width_childrens?: number
  qnt_childrens?: number
  max_width_carousel?: number
}

/**
 * Componente de Carosel simples. Para utilizar  certifique-se de que os childrens tem a mesma largura(width), para ter uma maior experiencia.
 * @param param0 {CaroselParams}
 * @returns {JSX.Element}
 */
const Carosel:React.FC<CaroselParams> = ({children, max_width}: CaroselParams):JSX.Element => {

  const Carousel = useRef<HTMLDivElement>(null)

  const [stateCarosel, setStateCarousel] = useState<StateCaroselParams>()

  const handleCarousel = useCallback(() => {
    if(Carousel.current) {
      const carousel = Carousel.current
      setStateCarousel(
        {
          ...stateCarosel, 
          width_carosel: carousel.clientWidth,
          qnt_childrens: carousel.children.length,
          width_childrens: carousel.children.item(0)?.clientWidth,
          max_width_carousel: ((carousel.children.length -1) * carousel.children.item(0)?.clientWidth!)
        }
      )
    }
  }, [setStateCarousel])

  const handleCarouselAction = (e:MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    
    switch (e.currentTarget.id) {
      case "next":
        return Carousel.current!.scrollLeft += stateCarosel?.width_childrens!
    
      case "prev":
        return Carousel.current!.scrollLeft -= stateCarosel?.width_childrens!
        
      default:
        return null
    }
  }

  useEffect(() => handleCarousel(), [handleCarousel])

  return (
    <ContainerRelativo max={max_width || stateCarosel?.max_width_carousel }>
        <Container ref={Carousel}>
          {children}
          <div className="buttons">
            <button onClick={handleCarouselAction} id="prev" className="prev"><img src="./icons/arrow_left.svg" alt="Left arrow" /></button>
            <button onClick={handleCarouselAction} id="next" className="next"><img src="./icons/arrow_right.svg" alt="Right arrow" /></button>
          </div>
        </Container>
      </ContainerRelativo>
  )
}

export default Carosel;