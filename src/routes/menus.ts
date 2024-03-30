const accepts = [
    '0x6e9470134FDC678ae5d9BfeEa7c44FBAEFc9523b'.toLowerCase(),
    '0x2E5cE3A6fa0a3a3F688AFcFb93008639bEd67E9c'.toLowerCase(),
    '0x1bE0ca39Fe91803d371B99640a27b0994d76d6DD'.toLowerCase(),
    '0x154538775D80725376601f3cA96C9202798EC41E'.toLowerCase(),
    '0x9bb7a0597D792A7Edc40d2aA8fEB83bF9F052130'.toLowerCase(),
    '0x635f3a8674807Fc74D0b8b83Db567C5eF37e2f11'.toLowerCase(),
]
export const menus = [
    {
        title:'Ranking',
        ico:'1',
        path:'/'
    },
    {
        title:'Transaction',
        ico:'2',
        path:'/transaction'
    },
    {
        title:'Robots',
        ico:'3',
        path:'/robots'
    },
    {
        title:'Configs',
        ico:'4',
        path:'/configs'
    },
    {
        title:'Logs',
        ico:'5',
        path:'/logs'
    },
    {
        title:'llmKey',
        ico:'6',
        path:'/llmkey'
    },
]

export const getAcceptsMenus = (address:string) =>{
    if(accepts.includes(address)){
        return menus;
    }else{
        return menus.slice(0,2);
    }
}