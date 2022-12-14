import './Home.css'

const SearchBar = ({ onSearchChange }) => {
    return(
        <div className='searchBar'>
            <input type="search" className="imageSearchField" onChange={onSearchChange} />
            <button className='submitImage'>🪄</button>
        </div>
    )
}

export default SearchBar;