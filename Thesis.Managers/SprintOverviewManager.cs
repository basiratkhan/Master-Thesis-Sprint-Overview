using System;
using System.Collections.Generic;
using Thesis.Models;
using Thesis.Services;
using System.Threading.Tasks;
using System.Linq;
using Thesis.CommonConstants;
using Microsoft.TeamFoundation.WorkItemTracking.WebApi.Models;

namespace Thesis.Managers
{
    public interface ISprintOverviewManager
    {
        Task<List<SprintWorkItemModel>> GetAllCurrentSprintTasks();
    }
    public class SprintOverviewManager : ISprintOverviewManager
    {
        protected readonly ISprintOverviewService _sprintOverviewService;
        public SprintOverviewManager(ISprintOverviewService sprintOverviewService)
        {
            _sprintOverviewService = sprintOverviewService;
        }
        public async Task<List<SprintWorkItemModel>> GetAllCurrentSprintTasks()
        {
            var workItemList = await _sprintOverviewService.GetAllCurrentSprintTasks();
            List<SprintWorkItemModel> sprintWorkItemList = new List<SprintWorkItemModel>();
            this.MapperMethod(workItemList, sprintWorkItemList);
            return sprintWorkItemList;
        }
        private void MapperMethod(List<WorkItem> tasksList, List<SprintWorkItemModel> sprintWorkItemList)
        {
            if (tasksList == null)
                return;
            foreach (WorkItem task in tasksList)
            {
                SprintWorkItemModel sprintWorkItem = new SprintWorkItemModel();
                if (task.Fields.Count > 0)
                {
                    foreach (string fld in task.Fields.Keys.ToList<string>())
                    {
                        if (fld == MicrosoftVSTSConstants.Priority)
                        {
                            sprintWorkItem.Priority = (Int64)task.Fields[fld];
                        }
                        if (fld == MicrosoftVSTSConstants.State)
                        {
                            sprintWorkItem.State = task.Fields[fld].ToString();
                        }
                        if (fld == MicrosoftVSTSConstants.AssignedTo)
                        {
                            var obj = task.Fields[fld];
                            System.Reflection.PropertyInfo pi = obj.GetType().GetProperty("DisplayName");
                            sprintWorkItem.AssignedTo = (string)pi.GetValue(obj, null);
                        }
                    }
                }
                sprintWorkItem.UniqueIdentifier = task.Id ?? 0;
                sprintWorkItemList.Add(sprintWorkItem);
            }
        }
    }
}
