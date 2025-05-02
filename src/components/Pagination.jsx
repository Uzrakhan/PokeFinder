import { usePokemon } from "../context/PokemonContext";

const Pagination = () => {
    const { 
        currentPage,
        totalPages,
        itemsPerPage,
        setCurrentPage,
        setItemsPerPage 
    } = usePokemon();
    
    const handlePageChange =(newPage) => {
        if(newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage)
        }
    }

    return (
        <div className="pagination flex items-center justify-center gap-4 my-6">
            <div className="page-size">
                <select 
                 value={itemsPerPage}
                 onChange={(e) => {
                    setItemsPerPage(Number(e.target.value))
                    setCurrentPage(1) //reset
                 }}
                 className="bg-purple-800 text-white px-3 py-1 rounded"
                 aria-label="Items per page"
                >
                    {[10,20,50].map((size) => (
                        <option key={size} value={size}>
                            Show {size}
                        </option>
                    ))}
                </select>
            </div>

            <div className="page-controls flex items-center gap-2">
                <button
                 onClick={() =>handlePageChange(currentPage - 1)}
                 disabled={currentPage === 1}
                 className="bg-purple-800 text-white px-4 py-2 rounded disabled:opacity-50"
                 aria-label="Previous page"
                >
                    ◀   
                </button>

                <span className="text-white">
                    Page {currentPage} of {totalPages}
                </span>

                <button
                 onClick={() => handlePageChange(currentPage + 1)}
                 disabled={currentPage === totalPages}
                 className="bg-purple-800 text-white px-4 py-2 rounded disabled:opacity-50"
                 aria-label="Next page"
                >
                    ▶
                </button>
            </div>
        </div>
    )
}

export default Pagination;