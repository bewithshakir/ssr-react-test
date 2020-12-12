export const CardItem = ({ item }) => {
  const {
    imgPath,
    missionName,
    missionIds,
    launchYear,
    successfullLaunch,
    successfullLanding,
  } = item;
  return (
    <div className="col-md-6 col-lg-3  item">
      <div className="card">
        <div className="img_wrp">
          <img src={imgPath} className="card-img-top" alt="..." />
        </div>
        <div className="card-body">
          <a href="#" className="card-title">
            {missionName}
          </a>
          <div className="card-text">
            <strong>Mission IDs</strong>
            <ul>
              {missionIds &&
                Array.isArray(missionIds) &&
                missionIds.map((id) => <li key={id}>{id}</li>)}
            </ul>
            <div>
              <strong>Launch Year: </strong> <span>{launchYear}</span>
            </div>
            <div>
              <strong>Successfull Launch: </strong>{" "}
              <span>{successfullLaunch}</span>
            </div>
            <div>
              <strong>Successfull Landing: </strong>{" "}
              <span>{successfullLanding}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
