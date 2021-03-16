using System;

namespace Thesis.Models
{
    public class SprintWorkItemModel
    {
        public Int64 Priority { get; set; }
        public string Height { get; set; }
        public string Width { get; set; }
        public string AssignedTo { get; set; }
        public string State { get; set; }
        public string StatePosition { get; set; }
        public int UniqueIdentifier { get; set; }
    }
}
