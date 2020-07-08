namespace WebAPI.Models
{
    public class Stat<T>
    {
        public T Metric { get; set; }
        public int Count { get; set; }
    }
}
