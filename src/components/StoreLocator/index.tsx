import Search from './Search'
import StoreList from './StoreList'
import StoreContextProvider from '../../context'

const StoreLocatorPage = () => {
  return (
    <StoreContextProvider>
      <div>
        <div className="flexWrapper">
          <Search />
          <StoreList />
        </div>
      </div>
    </StoreContextProvider>
  )
}

export default StoreLocatorPage
