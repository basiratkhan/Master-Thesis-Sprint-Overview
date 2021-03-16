using Microsoft.TeamFoundation.WorkItemTracking.WebApi;
using Microsoft.TeamFoundation.WorkItemTracking.WebApi.Models;
using Microsoft.VisualStudio.Services.WebApi;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Thesis.Services
{
    public interface ISprintOverviewService
    {
        Task<List<WorkItem>> GetAllCurrentSprintTasks();
    }
    public class SprintOverviewService : ISprintOverviewService
    {
        public async Task<List<WorkItem>> GetAllCurrentSprintTasks()
        {
            VssConnection connection = null;
            connection = new VssConnection(new Uri("https://dev.azure.com/basiratkhan"), new Microsoft.VisualStudio.Services.Common.VssBasicCredential(string.Empty, "e2pq6muwhlsipm4mnxd2p72pxhogmwy45okizkjhl7vk7l6jdisa"));
            WorkItemTrackingHttpClient witClient = connection.GetClient<WorkItemTrackingHttpClient>();
            Wiql wiql = new Wiql();
            wiql.Query = "SELECT [System.Id], [System.WorkItemType], [System.Title], [System.State], [System.AreaPath], [System.IterationPath] FROM workitems WHERE [System.TeamProject] = 'Ambient Display' AND [System.IterationPath] = 'Ambient Display\\Sprint 1' AND [System.WorkItemType]='Task' ORDER BY[System.ChangedDate] DESC";
            WorkItemQueryResult tasks = await witClient.QueryByWiqlAsync(wiql);
            List<WorkItem> tasksList = null;
            if (tasks.WorkItems.Any())
            {
                IEnumerable<WorkItemReference> tasksRefs;
                tasksRefs = tasks.WorkItems;
                tasksList = await witClient.GetWorkItemsAsync(tasksRefs.Select(wir => wir.Id));
            }
            return tasksList;
        }
    }
}
