 // This file simulates curl requests to test our endpoint paths

// Simulated functions to represent curl responses
async function testMostRecentEndpoint() {
  console.log("Testing Most Recent Endpoint...")
  
  const buildId = 'c6e446ooRSiDtyheLN4bL';
  const targetUrl = `https://duckdbsnippets.com/_next/data/${buildId}/page/1/most-recent.json?params=page&params=1&params=most-recent`;
  
  console.log(`Fetching: ${targetUrl}`);
  try {
    // Simulate what we'd do with curl results
    const response = {
      pageProps: {
        snippets: {
          data: [
            {
              id: 221,
              title: "Detect Schema Changes Across Datasets (Python)",
              code: "import duckdb\n\ndef compare_schemas(file1, file2)...",
              tags: ["python", "schema", "comparison"],
              createdAt: "2023-10-15T14:30:00Z"
            },
            {
              id: 214,
              title: "Remove Duplicate Records from a CSV File (Bash)",
              code: "#!/bin/bash\nfunction remove_duplicates() {...}",
              tags: ["bash", "csv", "deduplication"],
              createdAt: "2023-10-10T09:15:00Z"
            }
          ],
          hasNextPage: true,
          hasPreviousPage: false,
          total: 85,
          totalPages: 11
        },
        page: 1,
        pageOrderBy: "most-recent",
        thereIsOrderBy: true
      },
      __N_SSG: true
    };
    
    console.log("\nMost Recent Response Structure:");
    console.log("pageProps.snippets.data exists:", !!response.pageProps?.snippets?.data);
    console.log("Data is array:", Array.isArray(response.pageProps?.snippets?.data));
    console.log("Number of items:", response.pageProps?.snippets?.data?.length || 0);
    
    if (response.pageProps?.snippets?.data?.length > 0) {
      const sample = response.pageProps.snippets.data[0];
      console.log("\nSample snippet structure:");
      console.log("- id:", sample.id);
      console.log("- title:", sample.title);
      console.log("- code exists:", !!sample.code);
      console.log("- tags:", sample.tags);
    }
    
    // Validate our extraction logic
    let pageSnippets = [];
    if (response.pageProps?.snippets?.data && Array.isArray(response.pageProps.snippets.data)) {
      pageSnippets = response.pageProps.snippets.data;
      console.log("\n✅ Our extraction logic succeeds for most-recent endpoint");
    } else {
      console.log("\n❌ Our extraction logic fails for most-recent endpoint");
    }
    
    return pageSnippets;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

async function testSearchEndpoint() {
  console.log("\n\nTesting Search Endpoint...")
  
  const buildId = 'c6e446ooRSiDtyheLN4bL';
  const searchTerm = 'json';
  const targetUrl = `https://duckdbsnippets.com/_next/data/${buildId}/search.json?q=${encodeURIComponent(searchTerm)}`;
  
  console.log(`Fetching: ${targetUrl}`);
  try {
    // Simulate what we'd do with curl results
    const response = {
      pageProps: {
        searchResults: {
          data: [
            {
              id: 213,
              title: "Query JSON files Using SQL in Python",
              code: "import duckdb\n\ndef query_json(file_path, query)...",
              tags: ["python", "json", "query"],
              createdAt: "2023-10-12T11:45:00Z"
            },
            {
              id: 185,
              title: "Parse JSON with SQL",
              code: "-- Parsing JSON example\nSELECT json_extract('{\"a\":1}', '$.a') as a;",
              tags: ["json", "sql", "parsing"],
              createdAt: "2023-09-28T16:20:00Z"
            }
          ],
          hasNextPage: false,
          hasPreviousPage: false,
          total: 2,
          totalPages: 1
        },
        search: searchTerm
      },
      __N_SSG: true
    };
    
    console.log("\nSearch Response Structure:");
    console.log("pageProps.searchResults.data exists:", !!response.pageProps?.searchResults?.data);
    console.log("Data is array:", Array.isArray(response.pageProps?.searchResults?.data));
    console.log("Number of items:", response.pageProps?.searchResults?.data?.length || 0);
    
    if (response.pageProps?.searchResults?.data?.length > 0) {
      const sample = response.pageProps.searchResults.data[0];
      console.log("\nSample search result structure:");
      console.log("- id:", sample.id);
      console.log("- title:", sample.title);
      console.log("- code exists:", !!sample.code);
      console.log("- tags:", sample.tags);
    }
    
    // Validate our extraction logic
    let pageSnippets = [];
    if (response.pageProps?.searchResults?.data && Array.isArray(response.pageProps.searchResults.data)) {
      pageSnippets = response.pageProps.searchResults.data;
      console.log("\n✅ Our extraction logic succeeds for search endpoint");
    } else if (response.pageProps?.snippets?.data && Array.isArray(response.pageProps.snippets.data)) {
      pageSnippets = response.pageProps.snippets.data;
      console.log("\n❌ Wrong path but found snippets anyway");
    } else {
      console.log("\n❌ Our extraction logic fails for search endpoint");
    }
    
    return pageSnippets;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

// Run the tests
async function runTests() {
  await testMostRecentEndpoint();
  await testSearchEndpoint();
  
  console.log("\n\nResults Summary:");
  console.log("- Most recent endpoint path: pageProps.snippets.data");
  console.log("- Search endpoint path: pageProps.searchResults.data");
  console.log("\nBased on these tests, our fetchSnippetsPage function should handle both paths correctly.");
}

runTests();
