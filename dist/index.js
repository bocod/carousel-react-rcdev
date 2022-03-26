Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styled = require('styled-components');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

const Temporari = styled__default["default"].div `
  max-width: calc(50% - 140px);
  width: 100%;
`;
const ContainerRelativo = styled__default["default"].div `
  position: relative;
`;
const Container = styled__default["default"].div `
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
`;
const Carosel = ({ children }) => {
    const Carosel = React.useRef(null);
    const [stateCarosel, setStateCarosel] = React.useState();
    const handleCarosel = React.useCallback(() => {
        var _a;
        if (Carosel.current) {
            const carosel = Carosel.current;
            setStateCarosel(Object.assign(Object.assign({}, stateCarosel), { width_carosel: carosel.clientWidth, qnt_childrens: carosel.children.length, width_childrens: (_a = carosel.children.item(0)) === null || _a === void 0 ? void 0 : _a.clientWidth }));
        }
    }, [setStateCarosel]);
    const handleCaroselAction = (e) => {
        e.preventDefault();
        switch (e.currentTarget.id) {
            case "next":
                return Carosel.current.scrollLeft += stateCarosel === null || stateCarosel === void 0 ? void 0 : stateCarosel.width_childrens;
            case "prev":
                return Carosel.current.scrollLeft -= stateCarosel === null || stateCarosel === void 0 ? void 0 : stateCarosel.width_childrens;
            default:
                return null;
        }
    };
    React.useEffect(() => handleCarosel(), [handleCarosel]);
    return (React__default["default"].createElement(Temporari, null,
        React__default["default"].createElement(ContainerRelativo, null,
            React__default["default"].createElement(Container, { ref: Carosel },
                children,
                React__default["default"].createElement("div", { className: "buttons" },
                    React__default["default"].createElement("button", { onClick: handleCaroselAction, id: "prev", className: "prev" }, "prev"),
                    React__default["default"].createElement("button", { onClick: handleCaroselAction, id: "next", className: "next" }, "next"))))));
};

exports["default"] = Carosel;
//# sourceMappingURL=index.js.map
