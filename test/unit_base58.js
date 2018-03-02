/* eslint env: { "mocha": true } */
const base58 = require('../')

describe('base58', function(){

  it('should export a function', function(){
    expect( base58 ).to.be.a('function')
  })

  it('should return a string', function(){
    expect( base58(2) ).to.be.a('string')
  })

  it('should return a string', function(){
    expect( base58(6) ).to.be.match(/^[0-9a-z]{6}$/i)
  })
  
  it('should error on a undefined method param', function(){
    let fn = ()=> base58()
    expect( fn ).to.throw(/base58 length must be a number "undefined"/i)
  })
  
  it('should error on a string method param', function(){
    let fn = ()=> base58('a')
    expect( fn ).to.throw(/base58 length must be a number "a"/i)
  })

  it('should not carc it on a float', function(){
    expect( base58(4.4) ).to.match(/^[0-9a-z]{4}/i)
    expect( base58(4.9) ).to.match(/^[0-9a-z]{4}/i)
  })

  it('should successfully test a base58 string', function(){
    expect( base58.test('a234qwerXCZV') ).to.be.true
  })

  it('should fail test on a non base58 string', function(){
    expect( base58.test('abc1') ).to.be.false
  })

  it('should fail test on a non base58 string', function(){
    expect( base58.test('abcl') ).to.be.false
  })

  it('should fail test on a non base58 string', function(){
    expect( base58.test('abc0') ).to.be.false
  })

  it('should fail test on a non base58 string', function(){
    expect( base58.test('abcO') ).to.be.false
  })

  it('should fail test on a non base58 string', function(){
    expect( base58.test('-V') ).to.be.false
  })

  it('should fail test on a non string', function(){
    expect( base58.test({}) ).to.be.false
  })
  
  describe('Math.random', function(){
    
    before('reset string', function(){
      expect( base58.initMath() ).to.be.undefined
    })

    it('should run the backup Math.random', function(){
      expect( base58.generateBase58Math() ).to.be.ok
    })
   
    it('should return a string', function(){
      expect( base58(2) ).to.be.a('string')
    })

    it('should return a base58 string the correct length', function(){
      expect( base58(6) ).to.be.match(/^[0-9a-z]{6}$/i)
    })

  })

  describe('crypto.randomBytes', function(){
    
    before('reset string', function(){
      expect( base58.initNode() ).to.be.undefined
    })

    it('should run the backup Math.random', function(){
      expect( base58.generateBase58Node() ).to.be.ok
    })
   
    it('should return a string', function(){
      expect( base58(2) ).to.be.a('string')
    })

    it('should return a base58 string the correct length', function(){
      expect( base58(6) ).to.be.match(/^[0-9a-z]{6}$/i)
    })

  })

  xdescribe('window.crypto.getRandomValues', function(){
    
    before('reset string', function(){
      expect( base58.initBrowser() ).to.be.undefined
    })

    it('should run the backup Math.random', function(){
      expect( base58.generateBase58Browser() ).to.be.ok
    })
   
    it('should return a string', function(){
      expect( base58(2) ).to.be.a('string')
    })

    it('should return a base58 string the correct length', function(){
      expect( base58(6) ).to.be.match(/^[0-9a-z]{6}$/i)
    })

  })

})
