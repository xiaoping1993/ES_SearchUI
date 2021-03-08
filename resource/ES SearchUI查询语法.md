[toc]


## 一：DSL
    提供json模式查询，属于复杂查询

### 注意：
    1：查询后面加?pretty 
        美化输出
    2: 查询后面加?source=id,name
        指定查询返回结果fields
    3：查询过滤区别
        查询是看匹配度的有_sorce计算的更耗时，但会缓存
        结果对后来查询速度回加快，过滤一般用的就是完全
        匹配的可以用速度快
    4：js的调用方式（待解决）
        目前知道两种：ajax、node.js引入一个client,待测试
<details>
<summary>创建索引</summary>
<pre><code>
    PUT /shop
    {
        "settings" : {
            "number_of_shards" : 1, \\参考：https://blog.csdn.net/alan_liuyue/article/details/79585345    
                                    \\索引分片，按照每个分片最好不超过30GB的原则设置数量；开始阶段, 
                                    \\一个好的方案是根据你的节点数量按照1.5~3倍的原则来创建分片
            "number_of_replicas" : 1,   \\索引备份数
            "analysis":{
          	  "filter":{
          	    "my_synonym_filter":{
          	      "type":"synonym",
          	      "synonym_path":"analysis-ik/synonyms.txt" \\指定扩展同义词库
          	    }
          	  },
          	  "analyzer":{
          	    "ik_syno":{
          	      "type":"custom",
          	      "tokenizer":"ik_smart",
          	      "filter":["my_synonym_filter"]
          	    },
          	    "ik_syno_max":{
          	      "type":"custom",
          	      "tokenizer":"ik_smart",
          	      "filter":["my_synonym_filter"]
          	    }
          	  }
    	      }
    	},
    	"mappings": {
            "properties": {
                "id":{"type":"integer"},
                "name":{"type":"text","analyzer": "ik_syno_max","search_analyzer":"ik_syno"},
                "tags":{"type":"text","analyzer": "whitespace","fielddata":true},
                "location":{"type":"geo_point"},
                "remark_score":{"type":"double"},
                "price_per_man":{"type":"integer"},
                "category_id":{"type":"integer"},
                "category_name":{"type":"keyword"},
                "seller_id":{"type":"integer"},
                "seller_remark_score":{"type":"double"},
                "seller_disabled_flag":{"type":"integer"}
             }
    	}
    }
</code></pre>
</details>
<details>
<summary>删除索引</summary>
<pre><code>
    delete /haoke #索引名称
    {
        "acknowledged":true
    }
</code></pre>
</details>
<details>
<summary>索引中全局更新数据</summary>
<pre><code>
    URL规则：POST /{索引}/{id}
    post /haoke/1001
    {
        "id":1001,
        "name":"xiaoming",
        "age":22, #直接插入后就是全局更新了
        "sex":"男"
    }
</code></pre>
</details>
</code></pre>
</details>
</html>
<html>
<details>
<summary>索引中部分更新数据</summary>
<pre><code>
URL规则：POST /{索引}/{id}/_update
post /haoke/1001/_update
{
    "doc":{
        "sex":"女"  #剧本更新为女了
    }
}
</code></pre>
</details>
</html>
<html>
<details>
<summary>索引中删除数据（这里暂时只是先标记为删除、删除操作是在之后索引变多后后台自动批量删除的）</summary>
<pre><code>
URL规则：delete /{索引}/{id}
delete /haoke/1001/
</code></pre>
</details>
</html>
<html>
<details>
<summary>全部搜索</summary>
<pre><code>
GET /haoke/_search
</code></pre>
</details>
</html>
<html>
<html>
<details>
<summary>条件搜索</summary>
<pre><code>
GET /haoke/_search?q=age:12
</code></pre>
</details>
</html>
<html>
<details>
<summary>查询在bank索引中搜索所有匹配的查询脚本</summary>
<pre><code>
GET /bank/_search?pretty
{
  "query": { "match_all": {} },
  "sort": [
    { "account_number": "asc" }
  ],
  "from": 11,
  "size": 10
}
</code></pre>
</details>
</html>
<html>
<details>
<summary>
    match_parase段落匹配
    
    （即段落内容为一个整体匹配的文档）
    先将查询段落分词，再从倒排索引中查找，但只留下每个查询分词都存在且临近的document
</summary>
<pre><code>
GET /bank/_search
{
  "query": {
    "match_phrase": {
    "address": "mill lane"
  }}
}
</code></pre>
</details>
</html>
<html>
<details>
<summary>
    match:词组匹配
    
    与段落匹配正好对应，
    无此操作（后续只保留每个查询分词都存在且临近的document）
    
</summary>
<pre>
GET /bank/_search
{
  "query": { "match": { "address": "mill lane" } }
}
</pre>
</details>
</html>
<html>
<details>
<summary>bool:组合bool匹配</summary>
<pre><code>
GET /bank/_search
{
  "query": {
    "bool": {
      "must": [
        { "match": { "age": "40" } }
      ],
      "must_not": [
        { "match": { "state": "ID" } }
      ]
    }
  }
}    
</code><pre>
</details>
</html>
<html>
<details>
<summary>bool->blance：在两者之间的过滤</summary>
<pre><code>
GET /pki_dzbl_demo1/_search
{
  "query": {
    "bool": {
      "must": [
        {"match_all": {}
          
        }
      ],
      "filter": [
        {"range": {
          "grade": {
            "gte": "20",
            "lte": "50"
          }
        }}
      ]
    }
  }
</code></pre>
</details>
</html>
<html>
<html>
<html>
<details>
<summary>条件搜索</summary>
<pre><code>
GET /haoke/user/_search?q=age:12
</code></pre>
</details>
</html>
<html>
<details>
<summary>bool->高亮显示</summary>
<pre><code>
GET /bank/_search
{
  "query": {
    "match":{
        "name":"张三 李四"
    }
  },
   "highlight"{
       "fields":{
           "name":{}
       }
   }
}
</code></pre>
</details>
</html>
<html>
<details>
<summary>聚合查询：term、terms、avg、exist：再加order</summary>
<pre><code>
//term:结构化的完全匹配查询
参考：https://www.cnblogs.com/shaosks/p/7813729.html
term：完全匹配，不对搜索词做分词匹配到倒排document分词后的最小内容
    比如：这里匹配name="ping",则原来name="Wang Ji Ping",因为name会被分词为 wang ji ping 所有这里能被查到
post /itcast/_search
{
    "query":{
        "term":{
            "age":20
        }
    }
}
//terms:结构化的查询可以指定多个
类似sql中的in，例子中说age匹配20或者21或者22
post /itcast/_search
{
    "query":{
        "term":{
            "age":[20,21,22]
        }
    }
}

//聚合操作aggs-》terms
//参考：https://blog.csdn.net/weixin_40341116/article/details/81173016;https://www.elastic.co/guide/en/elasticsearch/reference/current/getting-started-aggregations.html
GET /bank/_search
{
  "size": 0,//指定查询结果为0，为了将关注点放到下面的聚合结果中
  "aggs": {
    "group_by_state": {//聚合操作名称
      "terms": {    //指定字段state.keyword 做group by操作 显示各自文档数据
        "field": "state.keyword",
        "size": 1//指定聚合结果数目
      }
    }
  }
}
//增加一个avg
//根据state.keyword group by 聚合，再在各自对应聚合结果中再次聚合计算其对应桶中avg值
GET /bank/_search
{
  "size": 2,
  "aggs": {
    "group_by_state": {
      "terms": {
        "field": "state.keyword",
        "size": 1
      },
      "aggs": { //聚合后再聚合
        "average_balance": {
          "avg": {
            "field": "age"
          }
        }
      }
    }
  }
}
//基于此基础再加一个order
GET /bank/_search
{
  "size": 0,
  "aggs": {
    "group_by_state": {
      "terms": {
        "field": "state.keyword",
        "order": {
          "average_balance": "desc"
        }
      },
      "aggs": {
        "average_balance": {
          "avg": {
            "field": "balance"
          }
        }
      }
    }
  }
}
</code></pre>
</details>
</html>
<html>
<details>
<summary>判断文档是否存在</summary>
<pre><code>
head /user
</code></pre>
</details>
</html>
<html>
<html>
<details>
<summary>批量查询</summary>
<pre><code>
post /user/_mget
{
    "ids":["1001","1002"]
}
GET /_mget
{
  "docs":[
    {
      "_index":"test",
      "_type":"_doc",
      "_id":1,
      "_source":false //禁用source
    },
    {
      "_index":"test",
      "_type":"_doc",
      "_id":2,
      "_source":["counter"]//只查询包含counter的source
    },
    {
      "_index":"test",
      "_type":"_doc",
      "_id":3,
      "_source":{
        "include":["tags"]//通过include和exclude来控制属性的显示
      }
    }
    ]
}
</code></pre>
</details>
</html>
<html>
<html>
<details>
<summary>批量增删改</summary>
<pre><code>
POST /_bulk
    //删除
    { "delete": { "_index": "test_index", "_type": "test_type", "_id": "1" }} 
    //强制删除
    { "create": { "_index": "test_index", "_type": "test_type", "_id": "1" }}
    { "test_field":    "create test" }
    //不存在就创建，存在就替换、执行put操作
    { "index":  { "_index": "test_index", "_type": "test_type", "_id": "1" }}
    { "test_field":    "index test" }
    //更新,执行partial update操作
    { "update": { "_index": "test_index", "_type": "test_type", "_id": "1", "_retry_on_conflict" : 3} }
    { "doc" : {"test_field" : "update test"} }
</code></pre>
</details>
</html>
<html>
<html>
<details>
<summary>分页</summary>
<pre><code>
post /baoke/user/_search?size=1&from=1
</code></pre>
</details>
</html>
<html>
<details>
<summary>权重搜索：搜索关键字“音乐篮球”，如果结果中包含篮球10分，包含音乐2分</summary>
<pre><code>
post /index
{
    "query":{
        "bool":
            "must"：{
                "match":{
                    "hobby":{
                        "query":"音乐"，
                        "score":10
                    }
                },
                "match":{
                    "hobby":{
                        "query":"篮球"，
                        "score":2
                    }
            },
        }                
        }
    }
}
</code></pre>
</details>
</html>

## 二：KQL
    kibana提供，有许多辅助提示，属于简单搜索
### 注意：
    1）如何被第三方调用

<details>
<summary>分词查询</summary>
<pre><code>
//会将peach test做分词后到document倒排索引最小词查找
name: peach test
</code></pre>
</details>
<details>
<summary>不分词查询</summary>
<pre><code>
//不做分词，加上这个双引号后
name: "peach test"
</code></pre>
</details>
<details>
<summary>条件运算</summary>
<pre><code>
//条件运算符就是 > >= < <=
age >= 10
</code></pre>
</details>
<details>
<summary>逻辑运算符</summary>
<pre><code>
//查询语言自然少不了逻辑运算符 与或非，在 KQL 中代表了 and or not
age >= 10 and age < 100
name: "Jeff" or name: "Kitty"
not age >= 10
//其中 and 的优先级比 or 的高
age < 100 or name: wang and age >= 10
//当然也可以通过小括号来改变优先级，比如：
(age < 100 or name: wang) and age >= 10
</code></pre>
</details>
<details>
<summary>同一字段运算符简写</summary>
<pre><code>
age = 10 or age = 100
# 等价于
age: ( 10 or 100)
</code></pre>
</details>
<details>
<summary>通配符</summary>
<pre><code>
name: *
system: win*
</code></pre>
</details>
<details>
<summary>同一字段运算符简写</summary>
<pre><code>
age = 10 or age = 100
# 等价于
age: ( 10 or 100)
</code></pre>
</details>
<details>
<summary>字段嵌套查询</summary>
<pre><code>
//比如想筛选 level1.level2.prop1 是 foo 或者是 baz的，可以这样写：
level1.level2 { prop1: "foo" or prop1: "baz" }
</code></pre>
</details>