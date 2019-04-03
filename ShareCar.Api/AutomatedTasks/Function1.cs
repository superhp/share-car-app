using System;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;

namespace AutomatedTasks
{
    public static class Function1
    {

        [FunctionName("Function1")]
        public static void Run([TimerTrigger("0/15 * * * * *")]TimerInfo myTimer, TraceWriter log)
        {
            DataCleanUp test = new DataCleanUp(new ApplicationDbContext());

            test.DeleteOldRides();
            log.Info($"C# Timer trigger function executed at: {DateTime.Now}");
        }
    }
}
