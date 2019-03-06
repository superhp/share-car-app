using System;
using System.Net.Http;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;

namespace OldDataDeleting
{
    public static class Delete
    {

        [FunctionName("Delete")]
        public static async System.Threading.Tasks.Task RunAsync([TimerTrigger("0 */1 * * * *")]TimerInfo myTimer, TraceWriter log)
        {
            log.Info($"C# Timer trigger function executed at: {DateTime.Now}");
            using (var client = new HttpClient())
            {
                //   client.BaseAddress = new Uri("rrr");
                //        client.BaseAddress = new Uri("https://www.google.com");
                //      var result = await client.GetAsync("");
                //    string resultContent = await result.Content.ReadAsStringAsync();
                //  log.Info(resultContent);
                //await client.GetAsync("https://localhost:44360/api/Authentication/temp");
                await client.GetAsync("http://localhost:5963/api/Authentication/temp");
                //   var responseString = await client.GetAsync("https://www.google.com");

            }
        }
    }
}
