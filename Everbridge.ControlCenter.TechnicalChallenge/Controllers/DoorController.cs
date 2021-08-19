using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using DoorManagementSystem.DoorDatabase;
using DoorManagementSystem.Models;
using Microsoft.AspNetCore.Cors;

namespace DoorManagementSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class DoorController : ControllerBase
    {
        private readonly ILogger<DoorController> _logger;
        private readonly DoorRepositoryService _doorRepositoryService;

        public DoorController(ILogger<DoorController> logger, DoorRepositoryDatabaseContext databaseContext)
        {
            _logger = logger;
            _doorRepositoryService = new DoorRepositoryService(databaseContext);
        }

        [HttpGet]
        public async Task<IEnumerable<DoorRecord>> Get()
        {
            return await _doorRepositoryService.GetDoors();
        }

        [HttpGet]
        [Route("{doorId}")]
        public async Task<DoorModel> GetDoor([FromRoute][Required] string doorId)
        {
            var doorRecord = await _doorRepositoryService.GetDoor(doorId);

            return (doorRecord == null)
                ? null
                : new DoorModel
                {
                    Id = doorRecord.Id,
                    Label = doorRecord.Label,
                    IsOpen = doorRecord.IsOpen,
                    IsLocked = doorRecord.IsLocked
                };
        }

        [HttpPost]
        public async Task<ActionResult<DoorModel>> AddDoor(DoorModel door)
        {
            DoorRecordDto doorDto = new DoorRecordDto { Id = door.Id, Label = door.Label, IsLocked = door.IsLocked, IsOpen = door.IsOpen };
            var resultSet = await _doorRepositoryService.AddDoor(doorDto);

            return CreatedAtAction(nameof(GetDoor), new { id = resultSet.Id }, resultSet);
        }

        [HttpPut]
        [Route("{doorId}")]
        public async Task<ActionResult<DoorModel>> UpdateDoor(string doorId, DoorModel door)
        {
            DoorRecordDto doorDto = new DoorRecordDto { Id = door.Id, Label = door.Label, IsLocked = door.IsLocked, IsOpen = door.IsOpen };
            await _doorRepositoryService.UpdateDoor(doorId, doorDto);

            return NoContent();
        }

        [HttpDelete]
        [Route("{doorId}")]
        public async Task<ActionResult<DoorModel>> RemoveDoor(string doorId)
        {
            await _doorRepositoryService.RemoveDoor(doorId);
            return NoContent();
        }

        [HttpGet]
        [Route("open")]
        public async Task<IEnumerable<DoorRecord>> GetOpenDoors()
        {
            return await _doorRepositoryService.GetOpenDoors();
        }
        [HttpGet]
        [Route("closed")]
        public async Task<IEnumerable<DoorRecord>> GetClosedDoors()
        {
            return await _doorRepositoryService.GetClosedDoors();
        }
        [HttpGet]
        [Route("locked")]
        public async Task<IEnumerable<DoorRecord>> GetLockedDoors()
        {
            return await _doorRepositoryService.GetLockedDoors();
        }
        [HttpGet]
        [Route("unlocked")]
        public async Task<IEnumerable<DoorRecord>> GetUnlockedDoors()
        {
            return await _doorRepositoryService.GetUnlockedDoors();
        }

        [HttpPut]
        [Route("{doorId}/{label}")]
        public async Task<ActionResult<DoorModel>> UpdateLabel(string doorId, string label)
        {
            DoorModel door = await GetDoor(doorId);
            DoorRecordDto doorDto = new DoorRecordDto { Id = door.Id, Label = label, IsLocked = door.IsLocked, IsOpen = door.IsOpen };
            await _doorRepositoryService.UpdateDoor(doorId, doorDto);

            return NoContent();
        }

        [HttpPut]
        [Route("open/{doorId}")]
        public async Task<ActionResult<DoorModel>> OpenDoor(string doorId)
        {
            DoorModel door = await GetDoor(doorId);
            DoorRecordDto doorDto = new DoorRecordDto { Id = door.Id, Label = door.Label, IsLocked = door.IsLocked, IsOpen = true };
            await _doorRepositoryService.UpdateDoor(doorId, doorDto);

            return NoContent();
        }

        [HttpPut]
        [Route("close/{doorId}")]
        public async Task<ActionResult<DoorModel>> CloseDoor(string doorId)
        {
            DoorModel door = await GetDoor(doorId);
            DoorRecordDto doorDto = new DoorRecordDto { Id = door.Id, Label = door.Label, IsLocked = door.IsLocked, IsOpen = false };
            await _doorRepositoryService.UpdateDoor(doorId, doorDto);

            return NoContent();
        }
        [HttpPut]
        [Route("lock/{doorId}")]
        public async Task<ActionResult<DoorModel>> LockDoor(string doorId)
        {
            DoorModel door = await GetDoor(doorId);
            DoorRecordDto doorDto = new DoorRecordDto { Id = door.Id, Label = door.Label, IsLocked = true, IsOpen = door.IsOpen };
            await _doorRepositoryService.UpdateDoor(doorId, doorDto);

            return NoContent();
        }
        [HttpPut]
        [Route("unlcok/{doorId}")]
        public async Task<ActionResult<DoorModel>> UnlockDoor(string doorId)
        {
            DoorModel door = await GetDoor(doorId);
            DoorRecordDto doorDto = new DoorRecordDto { Id = door.Id, Label = door.Label, IsLocked = false, IsOpen = door.IsOpen };
            await _doorRepositoryService.UpdateDoor(doorId, doorDto);

            return NoContent();
        }



    }
}
