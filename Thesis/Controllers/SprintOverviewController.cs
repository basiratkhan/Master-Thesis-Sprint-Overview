using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Thesis.Managers;

namespace Thesis.Controllers
{
    
    [ApiController]
    public class SprintOverviewController : ControllerBase
    {
        protected readonly ISprintOverviewManager _sprintOverviewManager;
        public SprintOverviewController(ISprintOverviewManager sprintOverviewManager)
        {
            _sprintOverviewManager = sprintOverviewManager;
        }
        [HttpGet, Route("api/Sprint/Get")]
        public async Task<ActionResult> Get(int id)
        {
            try
            {
                return Ok(await _sprintOverviewManager.GetAllCurrentSprintTasks());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}