import './Home.css'

const SearchBar = ({ onSearchChange, onSearchSubmit, invalidLink }) => {
    return(
        <div className='searchBar'>
            <input 
                type="search" 
                className="imageSearchField" 
                onChange={onSearchChange}
                style={{borderColor: invalidLink? 'crimson': 'black'}} 
            />
            <button className='submitImage' onClick={onSearchSubmit}>🪄</button>
        </div>
    )
}

export default SearchBar;