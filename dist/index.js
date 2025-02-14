Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styled = require('styled-components');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

const ContainerRelativo = styled__default["default"].div `
  position: relative;
  max-width: ${({ max }) => `${max}px`};
  width: 100%;
`;
const Container = styled__default["default"].div `
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
`;
const Carosel = ({ children, max_width }) => {
    const Carousel = React.useRef(null);
    const [stateCarosel, setStateCarousel] = React.useState();
    const handleCarousel = React.useCallback(() => {
        var _a, _b;
        if (Carousel.current) {
            const carousel = Carousel.current;
            setStateCarousel(Object.assign(Object.assign({}, stateCarosel), { width_carosel: carousel.clientWidth, qnt_childrens: carousel.children.length, width_childrens: (_a = carousel.children.item(0)) === null || _a === void 0 ? void 0 : _a.clientWidth, max_width_carousel: ((carousel.children.length - 1) * ((_b = carousel.children.item(0)) === null || _b === void 0 ? void 0 : _b.clientWidth)) }));
        }
    }, [setStateCarousel]);
    const handleCarouselAction = (e) => {
        e.preventDefault();
        switch (e.currentTarget.id) {
            case "next":
                return Carousel.current.scrollLeft += stateCarosel === null || stateCarosel === void 0 ? void 0 : stateCarosel.width_childrens;
            case "prev":
                return Carousel.current.scrollLeft -= stateCarosel === null || stateCarosel === void 0 ? void 0 : stateCarosel.width_childrens;
            default:
                return null;
        }
    };
    React.useEffect(() => handleCarousel(), [handleCarousel]);
    return (React__default["default"].createElement(ContainerRelativo, { max: max_width || (stateCarosel === null || stateCarosel === void 0 ? void 0 : stateCarosel.max_width_carousel) },
        React__default["default"].createElement(Container, { ref: Carousel },
            children,
            React__default["default"].createElement("div", { className: "buttons" },
                React__default["default"].createElement("button", { onClick: handleCarouselAction, id: "prev", className: "prev" }, <img src="./icons/arrow_left.svg" alt="Left arrow" />),
                React__default["default"].createElement("button", { onClick: handleCarouselAction, id: "next", className: "next" }, <img src="./icons/arrow_right.svg" alt="Right arrow" />)))));
};

exports["default"] = Carosel;
//# sourceMappingURL=index.js.map
