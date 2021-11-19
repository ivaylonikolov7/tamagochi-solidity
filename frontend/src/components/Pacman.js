function Pacman(props){

    return (<>
    <div class="loader">
        <div class="circles" style ={{
            display: (props.feeding ? 'block' : 'none')
        }}>
            <span class="one"></span>
            <span class="two"></span>
            <span class="three"></span>
        </div>
        <div class="pacman">
            <span class="top"></span>
            <span class="bottom"></span>
            <span class="left"></span>
            <div class="eye"></div>
        </div>
    </div>
    </>)
}
export default Pacman;