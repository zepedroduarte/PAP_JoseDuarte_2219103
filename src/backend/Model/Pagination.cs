using System.Collections.Generic;

namespace backend.Model
{
    public class Pagination<T> where  T:class
    {
        public int TotalCount { get; set; }
        public int PageSize { get; set; }
        public int CurrentPageNumber { get; set; }
        public IEnumerable<T> Data { get; set; }
        
    }
}