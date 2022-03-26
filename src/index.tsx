import React, { MouseEvent, useCallback, useEffect, useRef, useState } from "react";

import styled from 'styled-components'

interface CaroselParams {
  children: any
}

const Temporari = styled.div`
  max-width: calc(50% - 140px);
  width: 100%;
`

const ContainerRelativo = styled.div`
  position: relative;
`

const Container = styled.div`
  background-color: red;
  max-width: 100%;
  width: 100%;
  overflow-x: scroll;
  display: flex;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }

  .buttons {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    justify-content: space-between;
    max-width: 100%;
    width: 100%;

    button {
      background: #0000004e;
      border: none;
      padding: 8px 12px;
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
}

/**
 * Componente de Carosel simples. Para utilizar  certifique-se de que os childrens tem a mesma largura(width), para ter uma maior experiencia.
 * @param param0 {CaroselParams}
 * @returns {JSX.Element}
 */
const Carosel:React.FC<CaroselParams> = ({children}: CaroselParams):JSX.Element => {

  const Carosel = useRef<HTMLDivElement>(null)

  const [stateCarosel, setStateCarosel] = useState<StateCaroselParams>()

  const handleCarosel = useCallback(() => {
    if(Carosel.current) {
      const carosel = Carosel.current
      setStateCarosel(
        {
          ...stateCarosel, 
          width_carosel: carosel.clientWidth,
          qnt_childrens: carosel.children.length,
          width_childrens: carosel.children.item(0)?.clientWidth
        }
      )
    }
  }, [setStateCarosel])

  const handleCaroselAction = (e:MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    
    switch (e.currentTarget.id) {
      case "next":
        return Carosel.current!.scrollLeft += stateCarosel?.width_childrens!
    
      case "prev":
        return Carosel.current!.scrollLeft -= stateCarosel?.width_childrens!
        
      default:
        return null
    }
  }

  useEffect(() => handleCarosel(), [handleCarosel])

  return (
    <Temporari>
      <ContainerRelativo>
        <Container ref={Carosel}>
          {children}
          <div className="buttons">
            <button onClick={handleCaroselAction} id="prev" className="prev">prev</button>
            <button onClick={handleCaroselAction} id="next" className="next">next</button>
          </div>
        </Container>
      </ContainerRelativo>
    </Temporari>
  )
}

export default Carosel;