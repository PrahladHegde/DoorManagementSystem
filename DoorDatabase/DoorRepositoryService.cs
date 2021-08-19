using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DoorManagementSystem.DoorDatabase
{
    public class DoorRepositoryService
    {
        private readonly DoorRepositoryDatabaseContext _userRepositoryDatabaseContext;

        public DoorRepositoryService(DoorRepositoryDatabaseContext userRepositoryDatabaseContext)
        {
            _userRepositoryDatabaseContext = userRepositoryDatabaseContext;
        }

        public async Task<List<string>> GetDoorsIds()
        {
            return _userRepositoryDatabaseContext.Doors.Select(x => x.Id).ToList();
        }

        public async Task<IEnumerable<DoorRecord>> GetDoors()
        {
            return await _userRepositoryDatabaseContext.Doors.ToListAsync();
        }

        public async Task<DoorRecordDto> GetDoor(string doorId)
        {
            var user = await _userRepositoryDatabaseContext.Doors.FindAsync(doorId);
            return (user != null) ? new DoorRecordDto(user) : null;
        }

        public async Task<DoorRecordDto> AddDoor(DoorRecordDto door)
        {
            var record = new DoorRecord
            {
                Label = door.Label,
                IsLocked = door.IsLocked,
                IsOpen = door.IsOpen
            };
            await _userRepositoryDatabaseContext.Doors.AddAsync(record);
            await _userRepositoryDatabaseContext.SaveChangesAsync();
            return new DoorRecordDto(record);
        }

        public async Task<DoorRecordDto> UpdateDoor(string id, DoorRecordDto door)
        {
           
            var record = new DoorRecord
            {
                Id = door.Id,
                Label = door.Label,
                IsLocked = door.IsLocked,
                IsOpen = door.IsOpen
            };

            if (DoorExists(id))
            {
                _userRepositoryDatabaseContext.Entry(record).State = EntityState.Modified;

                //_userRepositoryDatabaseContext.Update(record);
                await _userRepositoryDatabaseContext.SaveChangesAsync();

            }

            return new DoorRecordDto(record);

        }

        public async Task<DoorRecordDto> RemoveDoor(string doorId)
        {
            var record = await _userRepositoryDatabaseContext.Doors.FindAsync(doorId);
            if (record == null)
            {
                return null;
            }

            _userRepositoryDatabaseContext.Remove(record);
            await _userRepositoryDatabaseContext.SaveChangesAsync();

            return new DoorRecordDto(record);
        }

        private bool DoorExists(string id)
        {
            return _userRepositoryDatabaseContext.Doors.Any(x => x.Id == id);
        }

        public async Task<IEnumerable<DoorRecord>> GetClosedDoors()
        {
            return await _userRepositoryDatabaseContext.Doors.Where(e => e.IsOpen==false).ToListAsync();
        }
        public async Task<IEnumerable<DoorRecord>> GetOpenDoors()
        {
            return await _userRepositoryDatabaseContext.Doors.Where(e => e.IsOpen == true).ToListAsync();
        }
        public async Task<IEnumerable<DoorRecord>> GetLockedDoors()
        {
            return await _userRepositoryDatabaseContext.Doors.Where(e => e.IsLocked == true).ToListAsync();
        }
        public async Task<IEnumerable<DoorRecord>> GetUnlockedDoors()
        {
            return await _userRepositoryDatabaseContext.Doors.Where(e => e.IsLocked == false).ToListAsync();
        }
    }
}
