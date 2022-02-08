
function Levels(props) {
    return (
      <div className="level-wrapper">
        <Level levelName={'Beginner'} levelLetter={'A1'} clickLevel={()=>props.clickLevel('0')} />
        <Level levelName={'Elementary'} levelLetter={'A1+'} clickLevel={()=>props.clickLevel('1')} />
        <Level levelName={'Pre-Intermediate'} levelLetter={'A2'} clickLevel={()=>props.clickLevel('2')} />
        <Level levelName={'Intermediate'} levelLetter={'B1'} clickLevel={()=>props.clickLevel('3')} />
        <Level levelName={'Upper-Intermediate'} levelLetter={'B2'} clickLevel={()=>props.clickLevel('4')} />
        <Level levelName={'Advanced'} levelLetter={'C1'} clickLevel={()=>props.clickLevel('5')} />
      </div>
    );
}

function Level(props) {
  return (
    <div className="level__card" onClick={()=>props.clickLevel()}>
      <div>
        <p className="fs-4 m-0">{props.levelName}</p>
      </div>
      <div className="card__level-letter">
        <h2>{props.levelLetter}</h2>
      </div>
    </div>
  )
}

export default Levels;
