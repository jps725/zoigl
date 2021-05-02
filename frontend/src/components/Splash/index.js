export default function Splash() {
  return (
    // <div className=".splash__backgroundImg">
    //   <img
    //     className="splash__img"
    //     src="https://www.drinkmemag.com/wp-content/uploads/2015/04/homebrewing-header.jpg"
    //   />
    //   <h1>splash</h1>
    // </div>
    <>
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>
      <div className="content">
        <div>A Community of Homebrewers</div>
        <div className="img__container">
          <img
            alt="beer"
            className="splash__img1"
            src="https://www.drinkmemag.com/wp-content/uploads/2015/04/homebrewing-header.jpg"
          />
          <img
            alt="beer"
            className="splash__img2"
            src="https://253qv1sx4ey389p9wtpp9sj0-wpengine.netdna-ssl.com/wp-content/uploads/2020/10/HERO_Home_Brewing_GettyImages-1275207200_1920x1280-700x461.jpg"
          />
          <img
            alt="beer"
            className="splash__img3"
            src="https://253qv1sx4ey389p9wtpp9sj0-wpengine.netdna-ssl.com/wp-content/uploads/2020/04/Beer_Making_Hero_Credit_Michael_Delaporte_1920x1280.jpg"
          />
        </div>
      </div>
    </>
  );
}
