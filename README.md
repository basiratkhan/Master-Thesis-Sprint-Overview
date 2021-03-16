# Introduction 
The system displays the Microsoft Azure DevOps sprint board information in the form of an ambient display. Assume the system as a beautiful dynamic painting located in your periphery. The painting changes its look as the sprint information changes.  We coded the respective sprint tasks information as follows. 
·	Shape: Each unique shape represents a team member the task is “Assigned To”.
·	Size: The size of each shape represents the “Priority” of the task i.e. a task with Priority 1 will have the biggest size and vice versa.
·	Position: The position of the task represents its “State” i.e. a shape lying in first 0%-33% of the horizontal section of the screen shows that the task is in “To Do” state. Shapes lying in the mid of the screen shows “In Progress” and the shapes in the 66%-100% of the horizontal screen shows tasks with “Done” State.
·	Background Colour: The background colour indicates the overall progress of the sprint. The pink colour indicates that less than 33% of the task are in “Done” State within the sprint. The blue colour indicates that less than 66% of the tasks are in “Done” State. And the green colour indicates that more than 66% of the tasks are in “Done” State.
Shapes slides to different positions as you work on tasks. You can identify your respective shape by changing State of any of your assigned tasks. The painting is updated as soon as there is a change in the State of tasks. The total number of shapes shows the total number of tasks withing the current sprint, whereas the total number of shapes within a specific position shows the total number of tasks in that particular State. The prototype supports up to seven team members and up to 90 tasks within a sprint. Please bear in mind that the ambient display does not contain any textual/ numerical information.


# Getting Started
1.	Go to install.md to see how to install and build the source code.
2.	Go to Azure devOps and make an account for yourself.
3    Create a Scrum project, add team members, create some tasks and generate public access token.
3.	Go to SprintOverview/Thesis/Thesis.Services/SprintOverviewService.cs
4    At line 20, replace your project name and public access token.
5.   At line 23, enter your project name and sprint iteration path. 
4.	Run the code following the instructions in install.txt file.
6.   Change task states in AzureDevOps, the system display will be updated.


# Reference
- [PAT] https://docs.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops&tabs=preview-pageYou 
- [Read AzureDevOps] https://www.dotnetcurry.com/devops/1485/using-rest-api-azure-devops
- [CSS] https://css-tricks.com/almanac/properties/a/animation/

