using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TODOapi.Models;
using TODOapi.Data;

namespace TODOapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TODOController : ControllerBase
    {

        private readonly ApiContext _context;

        public TODOController(ApiContext context) 
        
        { 
        _context = context; 
        
        }

        [HttpGet]
        [Route("ReadAll")]
        public JsonResult ReadAll()
        {
            var job = _context.Jobs.ToList();

            return new JsonResult(Ok(job));
        }

        [HttpGet]
        [Route("Read")]
        public JsonResult Read(int id)
        {
            var job = _context.Jobs.Find(id);

            if (job == null)
            {
                return new JsonResult(NotFound());
            }

            return new JsonResult(Ok(job));
        }

        [HttpPost]
        public JsonResult Create(Job job)
        {
            _context.Jobs.Add(job);
            _context.SaveChanges();

            return new JsonResult(Ok(job));
        }

        [HttpPut]
        public JsonResult Update(Job job)
        {
            var jobInDb = _context.Jobs.Find(job.Id);

            if (jobInDb == null)
            {
                return new JsonResult(NotFound());
            }

            _context.Jobs.Update(job);
            _context.SaveChanges();

            return new JsonResult(Ok(job));
        }



        [HttpDelete]
        public JsonResult Delete(int id)
        {
            var Job = _context.Jobs.Find(id);

            if (Job == null)
            {
                return new JsonResult(NotFound());
            }
            _context.Jobs.Remove(Job);
            _context.SaveChanges();

            return new JsonResult(NoContent());
        }



    }



}
